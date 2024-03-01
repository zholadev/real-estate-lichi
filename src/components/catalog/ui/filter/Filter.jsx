import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Tabs} from "@/shared/uikit/tabs";
import FilterSm from "./filterSm/FilterSm";
import {Button} from "@/shared/uikit/button";
import useSetFilter from "../../lib/useSetFilter";
import FilterList from "./filterList/FilterList";
import usePushFilters from "../../lib/usePushFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {routerPage} from "@/entities/router/model/pages";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "@/entities/store/hooks/hooks";
import FilterIconMenu from "./filterIconMenu/FilterIconMenu";
import FilterBottomPanel from "./filterBottom/FilterBottomPanel";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";
import {useApiRequest, useDispatchHandler, useMediaMaxState, useToastMessage} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @last-updated 09.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function Filter(props) {
    const {i18n, pageParams, tabData} = props

    const timerClearValue = useRef(null)

    const router = useRouter()
    const query = useSearchParams()

    const app = useDispatchHandler()

    const PAGE_QUERY_PARAM = query.get("page") ?? 1

    const {apiFetchHandler} = useApiRequest()

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const convertQueryFilter = useFilterConvertQuery()

    const mediaQuerySm = useMediaMaxState({screenSize: 576})

    const {
        catalogType
    } = useAppSelector(state => state?.catalog)

    const {
        filterCtgAllData,
        filterCtgSidebar,
        filterCtgObjectQueries,
        filterCtgObjectData,
        filterCtgResidenceData,
        filterCtgQueriesData,
    } = useAppSelector(state => state?.filterCatalog)

    const FILTER_DATA = Object.values(filterCtgQueriesData || {})
    const FILTER_QUERY_DATA = Object.entries(convertQueryFilter(pageParams) || {})

    /**
     * @author Zholaman Zhumanov
     * @description Переключение мобильной версий
     * @return {*}
     */
    const toggleFilterSidebarHandle = () => app.filterCtgSidebarAction(!filterCtgSidebar);

    /**
     * Handles setting the filter query based on provided data
     *
     * @param {Object} filterData - The filter data to be set paired with its associated key
     * @param isSendFilters
     */
    const setFilterQueryHandle = (filterData, isSendFilters) => {
        app.filterCtgQueriesDataAction(filterData)

        if (isSendFilters) {
            sendFilterQuery(filterData, true, isSendFilters)
        }
    };

    /**
     * @author Zholaman Zhumanov
     * @param data
     * @return {*}
     */
    const setApiFiltersHandle = (data) => app.filterCtgObjectQueriesAction(data)

    /**
     * @description Tags Data
     * @returns {Promise<void>}
     */
    const getApartmentData = async () => {
        let paramsCustomObject = {}

        for (let key in filterCtgObjectQueries) {
            const newKey = key.replace("[apartments]", "");
            paramsCustomObject[newKey] = filterCtgObjectQueries[key];
        }

        await apiFetchHandler(
            apiGetApartmentsData,
            [
                PAGE_QUERY_PARAM,
                {"populate": false, "fields[0]": "name", "fields[1]": "price", ...paramsCustomObject}
            ],
            false,
            {
                onGetData: (params) => {
                    app.filterCtgObjectDataAction(params.api_data)
                }
            }
        )
    }

    const getResidenceListData = async () => {
        await apiFetchHandler(
            apiGetResidentialData,
            [PAGE_QUERY_PARAM, {
                "populate": false,
                "fields[0]": "name",
                "fields[1]": "price", ...filterCtgObjectQueries
            }],
            false,
            {
                onGetData: (params) => {
                    app.filterCtgResidenceDataAction(params.api_data)
                }
            }
        )
    }

    const getMinMaxPrices = useMemo(() => {
        try {
            const prices = Object.values(filterCtgObjectData || {}).map((item) => item?.["attributes"]?.["price"])

            if (prices.length === 0) {
                return {
                    "min": 0,
                    "max": 0
                }
            }

            return {
                "min": Math.min(...prices),
                "max": Math.max(...prices)
            }
        } catch (error) {
            errorHandler("filter", "getMinMaxPrices", error)
        }
    }, [filterCtgObjectData])

    const sendFilterQuery = async (filterData, filterToggle) => {
        const parsePrice = (key) => parseFloat(filterCtgQueriesData?.[`price.${key}`]);

        const invalidPriceMsg = "You entered incorrect price values";
        const lowerThanMinPriceMsg = "The total should not be lower than the minimum price";
        const exceedsMaxPriceMsg = "The total should not exceed the maximum price";

        const fromPrice = parsePrice('from');
        const toPrice = parsePrice('to');
        const minPrice = getMinMaxPrices?.["min"];
        const maxPrice = getMinMaxPrices?.["max"];

        if (fromPrice > toPrice) {
            toastMessage(`${invalidPriceMsg}, ${minPrice}`)
            return;
        }

        if (fromPrice < minPrice || toPrice < minPrice) {
            toastMessage(`${lowerThanMinPriceMsg}, ${minPrice}`)
            return;
        }

        if (toPrice > maxPrice) {
            toastMessage(`${exceedsMaxPriceMsg}, ${maxPrice}`)
            return;
        }


        if (filterData) {
            const newObjectFilter = {filterCtgQueriesData}

            const getFilterData = Object.values(newObjectFilter || {}).map((filterItem) => {
                return getSetFilterHandle(filterItem, filterData.key, filterData.value, true)
            })

            pushFilterHandle(routerPage.catalog, getFilterData?.[0]);
        } else {
            pushFilterHandle(routerPage.catalog, filterCtgQueriesData);
        }

        if (mediaQuerySm && !filterToggle) {
            toggleFilterSidebarHandle()
        }
    };

    const residenceApiParams = useMemo(() => {
        return catalogType === 'residential_complex' ? {
            "filters[apartments][name][$notNull]": true,
            "filters[apartments][residence][name][$notNull]": true
        } : {"filters[apartments][name][$notNull]": true}
    }, [catalogType])

    useEffect(() => {
        app.filterCtgApiQueriesDataAction(residenceApiParams)
    }, [catalogType]);

    useEffect(() => {
        getApartmentData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [PAGE_QUERY_PARAM, filterCtgObjectQueries]);

    useEffect(() => {
        getResidenceListData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [PAGE_QUERY_PARAM, filterCtgObjectQueries]);

    useEffect(() => {
        if (pageParams) {
            app.filterCtgQueriesDataFillAction(convertQueryFilter(pageParams))
        }
    }, [pageParams]);

    const clearFilters = useCallback(() => {
        try {
            if (timerClearValue.current) {
                clearTimeout(timerClearValue.current)
            }
            app.filterCtgQueriesDataAction({})
            app.filterCtgPriceFromAction(null)
            app.filterCtgPriceValueAction(null)
            app.filterCtgClearAction('clear')
            router.replace(routerPage.catalog)
            app.filterCtgObjectQueriesAction({})
            app.filterCtgQueriesDataFillAction(residenceApiParams)

            timerClearValue.current = setTimeout(() => {
                app.filterCtgClearAction('fill')
            }, 500)
        } catch (error) {
            errorHandler("filters", "clearFilters", error)
        }
    }, [timerClearValue, router, residenceApiParams])

    // console.log('queryFilter', queryFilter)
    // console.log('filterApartmentApi', filterCtgObjectQueries)
    // console.log('queryApiFilters', queryApiFilters)

    const buttonEventClickDisabled = useMemo(() => {
        try {
            if (FILTER_DATA.length === 0) return false
            return !!(catalogType === 'residential_complex' ? filterCtgResidenceData.length > 0 : filterCtgObjectData.length > 0)
        } catch (error) {
            console.log(error)
        }
    }, [FILTER_DATA, filterCtgObjectData, filterCtgResidenceData])

    const buttonMainTitle = useMemo(() => {
        try {
            return `${i18n?.["site"]?.["search_title"]} (${catalogType === 'residential_complex' ? filterCtgResidenceData.length : filterCtgObjectData.length})`
        } catch (error) {
            console.log(error)
        }
    }, [i18n, catalogType, filterCtgResidenceData, filterCtgObjectData])

    return (
        <>
            <div className={styles['filter_tab']}>
                <Tabs
                    i18n={i18n}
                    item={"title"}
                    url={'/catalog'}
                    tabData={tabData}
                    activeSelectName={"value"}
                    onClickEvent={clearFilters}
                    onClick={app.catalogContentAction}
                    defaultValue={query.get('type') || tabData?.[0]?.["value"]}
                />
            </div>

            <div className={styles['catalog_filter_lg']}>
                <FilterList
                    i18n={i18n}
                    clearFilters={clearFilters}
                    getMinMaxPrices={getMinMaxPrices}
                    getApartmentData={getApartmentData}
                    setApiFiltersHandle={setApiFiltersHandle}
                    setFilterQueryHandle={setFilterQueryHandle}
                />

                <Button
                    onClick={sendFilterQuery}
                    title={buttonMainTitle}
                    disabled={!buttonEventClickDisabled}
                    style={{
                        opacity: !buttonEventClickDisabled ? .3 : 1
                    }}
                />
            </div>

            <FilterBottomPanel
                i18n={i18n}
                filterData={FILTER_DATA}
                clearFilters={clearFilters}
                filterAllData={filterCtgAllData}
                filterDataQuery={filterCtgQueriesData}
                sendFilterQuery={sendFilterQuery}
                queryFilterData={FILTER_QUERY_DATA}
                filterClearHandle={setFilterQueryHandle}
                filterApiClearHandle={setApiFiltersHandle}

            />

            <FilterIconMenu
                i18n={i18n}
                toggleFilterHandle={toggleFilterSidebarHandle}
            />

            <FilterSm
                i18n={i18n}
                clearFilters={clearFilters}
                toggleFilter={filterCtgSidebar}
                getMinMaxPrices={getMinMaxPrices}
                buttonMainTitle={buttonMainTitle}
                sendFilterQuery={sendFilterQuery}
                getApartmentData={getApartmentData}
                setApiFiltersHandle={setApiFiltersHandle}
                setFilterQueryHandle={setFilterQueryHandle}
                toggleFilterHandle={toggleFilterSidebarHandle}
                buttonEventClickDisabled={!buttonEventClickDisabled}
            />
        </>

    );
}

export default Filter;
