import React, {useEffect, useMemo} from 'react';
import {useRouter} from "next/router";
import {Tabs} from "@/shared/uikit/tabs";
import FilterSm from "./filterSm/FilterSm";
import {Button} from "@/shared/uikit/button";
import {useSearchParams} from "next/navigation";
import FilterList from "./filterList/FilterList";
import useClearFilters from "../../lib/useClearFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {useAppSelector} from "@/entities/store/hooks/hooks";
import FilterIconMenu from "./filterIconMenu/FilterIconMenu";
import FilterBottomPanel from "./filterBottom/FilterBottomPanel";
import {useApiRequest, useDispatchHandler} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import useSendFilters from "@/components/catalog/lib/useSendFilters";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";

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
    const {i18n, tabData} = props

    const router = useRouter()

    const {query} = router

    const searchQuery = useSearchParams()

    const app = useDispatchHandler()
    const filterSend = useSendFilters()
    const {clearFilters, residenceApiParams} = useClearFilters()

    const PAGE_QUERY_PARAM = searchQuery.get("page") ?? 1

    const {apiFetchHandler} = useApiRequest()

    const convertQueryFilter = useFilterConvertQuery()

    const {
        catalogType
    } = useAppSelector(state => state?.catalog)

    const {
        filterCtgSidebar,
        filterCtgObjectQueries,
        filterCtgObjectData,
        filterCtgResidenceData,
        filterCtgQueriesData,
    } = useAppSelector(state => state?.filterCatalog)

    const FILTER_DATA = Object.values(filterCtgQueriesData || {})

    /**
     * @author Zholaman Zhumanov
     * @description Переключение мобильной версий
     * @return {*}
     */
    const toggleFilterSidebarHandle = () => app.filterCtgSidebarAction(!filterCtgSidebar);

    /**
     * @author Zholaman Zhumanov
     * @description Получение значений для фильтров и отработка
     * @param filterData
     * @param isSendFilters
     */
    const setFilterQueryHandle = (filterData, isSendFilters) => {
        app.filterCtgQueriesDataAction(filterData)

        if (isSendFilters) {
            filterSend(filterData, true, isSendFilters)
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

    /**
     * @author Zholaman Zhumanov
     * @description Выполнение данных для жилых комплексов
     * @return {Promise<void>}
     */
    const getResidenceListData = async () => {
        await apiFetchHandler(
            apiGetResidentialData,
            [PAGE_QUERY_PARAM, {
                "populate": false,
                "fields[0]": "name",
                "fields[1]": "price",
                ...filterCtgObjectQueries
            }],
            false,
            {
                onGetData: (params) => {
                    app.filterCtgResidenceDataAction(params.api_data)
                }
            }
        )
    }

    useEffect(() => {
        app.filterCtgApiQueriesDataAction(residenceApiParams)
    }, [catalogType]);

    useEffect(() => {
        if (query) {
            app.filterCtgQueriesDataFillAction(convertQueryFilter(query))
        }
    }, [query]);

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

    /**
     * @author Zholaman Zhumanov
     * @description Проверка есть ли данные с фильтра и активирует кнопку
     * @type {boolean|*}
     */
    const buttonEventClickDisabled = useMemo(() => {
        try {
            if (FILTER_DATA.length === 0) return false
            return !!(catalogType === 'residential_complex' ? filterCtgResidenceData.length > 0 : filterCtgObjectData.length > 0)
        } catch (error) {
            console.log(error)
        }
    }, [FILTER_DATA, filterCtgObjectData, filterCtgResidenceData])

    /**
     * @author Zholaman Zhumanov
     * @description Заголовок для кнопки
     * @type {string}
     */
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
                    defaultValue={searchQuery.get('type') || tabData?.[0]?.["value"]}
                />
            </div>

            <div className={styles['catalog_filter_lg']}>
                <FilterList
                    i18n={i18n}
                    clearFilters={clearFilters}
                    setApiFiltersHandle={setApiFiltersHandle}
                    setFilterQueryHandle={setFilterQueryHandle}
                />

                <Button
                    onClick={filterSend}
                    title={buttonMainTitle}
                    disabled={!buttonEventClickDisabled}
                    style={{
                        opacity: !buttonEventClickDisabled ? .3 : 1
                    }}
                />
            </div>

            <FilterBottomPanel
                i18n={i18n}
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
                buttonMainTitle={buttonMainTitle}
                setApiFiltersHandle={setApiFiltersHandle}
                setFilterQueryHandle={setFilterQueryHandle}
                toggleFilterHandle={toggleFilterSidebarHandle}
                buttonEventClickDisabled={!buttonEventClickDisabled}
            />
        </>

    );
}

export default Filter;
