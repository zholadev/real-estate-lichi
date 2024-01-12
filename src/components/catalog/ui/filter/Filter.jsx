'use client'

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tabs} from "@/shared/uikit/tabs";
import FilterSm from "./filterSm/FilterSm";
import {Button} from "@/shared/uikit/button";
import useSetFilter from "../../lib/useSetFilter";
import FilterList from "./filterList/FilterList";
import usePushFilters from "../../lib/usePushFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {routerPage} from "@/entities/router/model/pages";
import {useRouter, useSearchParams} from "next/navigation";
import FilterIconMenu from "./filterIconMenu/FilterIconMenu";
import FilterBottomPanel from "./filterBottom/FilterBottomPanel";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import {apiGetApartmentsData} from "@/shared/services/clientRequests";
import {useApiRequest, useMediaMaxState, useToastMessage} from "@/shared/hooks";

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
    const {i18n, onClick, typeContent, pageParams, typeCatalog, setTypeCatalog, tabData} = props

    const timerClearValue = useRef(null)

    const router = useRouter()
    const query = useSearchParams()

    const PAGE_QUERY_PARAM = query.get("page") ?? 1

    const {apiFetchHandler, loading} = useApiRequest()

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const convertQueryFilter = useFilterConvertQuery()

    const mediaQuerySm = useMediaMaxState({screenSize: 576})

    const [priceFrom, setPriceFrom] = useState(null)
    const [priceValue, setPriceValue] = useState('')
    const [filterAllData, setFilterAllData] = useState([])
    const [toggleFilter, setToggleFilter] = useState(false)
    const [clearSelects, setClearSelects] = useState('fill')
    const [filterApartmentApiData, setFilterApartmentApiData] = useState({})
    const [apartmentListFilterData, setApartmentListFilterData] = useState([])
    const [queryFilter, setQueryFilter] = useState(convertQueryFilter(pageParams) || {})
    const [queryApiFilters, setQueryApiFilters] = useState({"filters[apartments][name][$notNull]": true})

    const FILTER_DATA = Object.values(queryFilter || {})
    const FILTER_QUERY_DATA = Object.entries(convertQueryFilter(pageParams) || {})

    const toggleFilterHandle = () => setToggleFilter(!toggleFilter);

    /**
     * Handles setting the filter query based on provided data
     *
     * @param {Object} filterData - The filter data to be set paired with its associated key
     * @param isSendFilters
     */
    const setFilterQueryHandle = (filterData, isSendFilters) => {
        const {key, value} = filterData
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value));

        if (isSendFilters) {
            sendFilterQuery(filterData, true, isSendFilters)
        }
    };

    const checkDistrictValue = useCallback(() => {
        if (!queryFilter?.["districts"]) {
            toastMessage("Please select a district")
        }
    }, [typeCatalog, queryFilter])

    const setApiFiltersHandle = (data) => {
        const {key, value} = data

        setQueryApiFilters(prevFilter => {
            return {
                ...prevFilter,
                [key]: value,
            }
        })

        setFilterApartmentApiData(
            prevFilter => {
                return {
                    ...prevFilter,
                    [key]: value,
                }
            }
        )
    }

    /**
     * @description Tags Data
     * @returns {Promise<void>}
     */
    const getApartmentData = async () => {
        let paramsCustomObject = {}

        for (let key in filterApartmentApiData) {
            const newKey = key.replace("[apartments]", "");
            paramsCustomObject[newKey] = filterApartmentApiData[key];
        }

        if (Object.values(filterApartmentApiData).length === 0 && FILTER_DATA.length > 0 ) {
            return
        }

        await apiFetchHandler(
            apiGetApartmentsData,
            [PAGE_QUERY_PARAM, {"populate": false, "fields[0]": "name", "fields[1]": "price", ...paramsCustomObject}],
            false,
            {
                onGetData: (params) => {
                    setApartmentListFilterData(params.data?.["data"]?.["data"])
                }
            }
        )
    }

    const getMinMaxPrices = useMemo(() => {
        try {
            const prices = Object.values(apartmentListFilterData || {}).map((item) => item?.["attributes"]?.["price"])

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
    }, [apartmentListFilterData])

    console.log(queryFilter, getMinMaxPrices)

    const sendFilterQuery = (filterData, filterToggle, filterQuickSend) => {
        const parsePrice = (key) => parseFloat(queryFilter?.[`price.${key}`]);

        const invalidPriceMsg = "You entered incorrect price values.";
        const lowerThanMinPriceMsg = "The total should not be lower than the minimum price.";
        const exceedsMaxPriceMsg = "The total should not exceed the maximum price.";

        const fromPrice = parsePrice('from');
        const toPrice = parsePrice('to');
        const minPrice = getMinMaxPrices?.["min"];
        const maxPrice = getMinMaxPrices?.["max"];

        if (fromPrice > toPrice) {
            toastMessage(invalidPriceMsg)
            return;
        }

        if (fromPrice < minPrice || toPrice < minPrice) {
            toastMessage(lowerThanMinPriceMsg)
            return;
        }

        if (toPrice > maxPrice) {
            toastMessage(exceedsMaxPriceMsg)
            return;
        }


        if (filterQuickSend) {
            const getFilterData = getSetFilterHandle({[filterData.key]: filterData.value}, filterData.key, filterData.value)

            pushFilterHandle(routerPage.catalog, getFilterData);
        } else if (filterData && !filterQuickSend) {
            const newObjectFilter = {queryFilter}

            const getFilterData = Object.values(newObjectFilter || {}).map((filterItem) => {
                return getSetFilterHandle(filterItem, filterData.key, null)
            })

            pushFilterHandle(routerPage.catalog, getFilterData?.[0]);
        } else {
            pushFilterHandle(routerPage.catalog, queryFilter);
        }

        if (mediaQuerySm && !filterToggle) {
            toggleFilterHandle()
        }
    };

    const residenceApiParams = useMemo(() => {
        return typeCatalog === 'residential_complex' ? {
            "filters[apartments][name][$notNull]": true,
            "filters[apartments][residence][name][$notNull]": true
        } : {"filters[apartments][name][$notNull]": true}
    }, [typeCatalog])

    useEffect(() => {
        setQueryApiFilters(residenceApiParams)
    }, [typeCatalog]);

    useEffect(() => {
        getApartmentData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [PAGE_QUERY_PARAM, filterApartmentApiData]);

    const clearFilters = useCallback(() => {
        try {
            if (timerClearValue.current) {
                clearTimeout(timerClearValue.current)
            }
            setQueryFilter({})
            setPriceValue(null)
            setPriceFrom(null)
            setClearSelects('clear')
            router.replace(routerPage.catalog)
            setFilterApartmentApiData({})
            setQueryApiFilters(residenceApiParams)

            timerClearValue.current = setTimeout(() => {
                setClearSelects('fill')
            }, 500)
        } catch (error) {
            errorHandler("filters", "clearFilters", error)
        }
    }, [timerClearValue, router, residenceApiParams])

    return (
        <>
            <Tabs
                i18n={i18n}
                item={"title"}
                url={'/catalog'}
                tabData={tabData}
                onClick={setTypeCatalog}
                onClickEvent={clearFilters}
                activeSelectName={"value"}
                defaultValue={query.get('type') || tabData?.[0]?.["value"]}
            />

            <div className={styles['catalog_filter_lg']}>
                <FilterList
                    i18n={i18n}
                    priceFrom={priceFrom}
                    priceValue={priceValue}
                    queryFilter={queryFilter}
                    typeCatalog={typeCatalog}
                    clearSelect={clearSelects}
                    clearFilters={clearFilters}
                    setPriceFrom={setPriceFrom}
                    setPriceValue={setPriceValue}
                    getMinMaxPrices={getMinMaxPrices}
                    queryApiFilters={queryApiFilters}
                    setFilterAllData={setFilterAllData}
                    getApartmentData={getApartmentData}
                    checkDistrictValue={checkDistrictValue}
                    setApiFiltersHandle={setApiFiltersHandle}
                    setFilterQueryHandle={setFilterQueryHandle}
                    filterApartmentApiData={filterApartmentApiData}
                />

                <Button
                    onClick={sendFilterQuery}
                    title={i18n?.["site"]?.["search_title"]}
                    disabled={FILTER_DATA.length === 0}
                    style={{
                        opacity: FILTER_DATA.length === 0 ? .3 : 1
                    }}
                />
            </div>

            <FilterBottomPanel
                i18n={i18n}
                onClick={onClick}
                filterData={FILTER_DATA}
                typeContent={typeContent}
                clearFilters={clearFilters}
                filterAllData={filterAllData}
                filterDataQuery={queryFilter}
                setQueryFilter={setQueryFilter}
                sendFilterQuery={sendFilterQuery}
                queryFilterData={FILTER_QUERY_DATA}
                filterClearHandle={setFilterQueryHandle}
                filterApiClearHandle={setApiFiltersHandle}

            />

            <FilterIconMenu
                i18n={i18n}
                toggleFilterHandle={toggleFilterHandle}
            />

            <FilterSm
                i18n={i18n}
                priceFrom={priceFrom}
                priceValue={priceValue}
                filterData={FILTER_DATA}
                queryFilter={queryFilter}
                typeCatalog={typeCatalog}
                clearSelect={clearSelects}
                clearFilters={clearFilters}
                toggleFilter={toggleFilter}
                setPriceFrom={setPriceFrom}
                setPriceValue={setPriceValue}
                getMinMaxPrices={getMinMaxPrices}
                queryApiFilters={queryApiFilters}
                sendFilterQuery={sendFilterQuery}
                getApartmentData={getApartmentData}
                setFilterAllData={setFilterAllData}
                toggleFilterHandle={toggleFilterHandle}
                checkDistrictValue={checkDistrictValue}
                setApiFiltersHandle={setApiFiltersHandle}
                setFilterQueryHandle={setFilterQueryHandle}
                filterApartmentApiData={filterApartmentApiData}
            />
        </>

    );
}

export default Filter;
