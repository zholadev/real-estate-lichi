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
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";
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

    const {apiFetchHandler} = useApiRequest()

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
    const [residenceListFilterData, setResidenceListFilterData] = useState([])
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

        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value, true));

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
        setFilterApartmentApiData(prevFilter => getSetFilterHandle(prevFilter, key, value, true))
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

    const getResidenceListData = async () => {
        await apiFetchHandler(
            apiGetResidentialData,
            [PAGE_QUERY_PARAM, {
                "populate": false,
                "fields[0]": "name",
                "fields[1]": "price", ...filterApartmentApiData
            }],
            false,
            {
                onGetData: (params) => {
                    setResidenceListFilterData(params.data?.["data"]?.["data"])
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

    const sendFilterQuery = async (filterData, filterToggle) => {
        const parsePrice = (key) => parseFloat(queryFilter?.[`price.${key}`]);

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
            const newObjectFilter = {queryFilter}

            const getFilterData = Object.values(newObjectFilter || {}).map((filterItem) => {
                return getSetFilterHandle(filterItem, filterData.key, filterData.value, true)
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

    useEffect(() => {
        getResidenceListData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [PAGE_QUERY_PARAM, filterApartmentApiData]);

    useEffect(() => {
        if (pageParams) {
            setQueryFilter(convertQueryFilter(pageParams))
        }
    }, [pageParams]);

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

    // console.log('queryFilter', queryFilter)
    // console.log('filterApartmentApi', filterApartmentApiData)
    // console.log('queryApiFilters', queryApiFilters)

    const buttonEventClickDisabled = useMemo(() => {
        return !!(FILTER_DATA.length === 0 || apartmentListFilterData.length === 0 || residenceListFilterData.length === 0)
    }, [FILTER_DATA, apartmentListFilterData, residenceListFilterData])

    return (
        <>
            <div className={styles['filter_tab']}>
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
            </div>

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
                    title={`${i18n?.["site"]?.["search_title"]} (${typeCatalog === 'residential_complex' ? residenceListFilterData.length : apartmentListFilterData.length})`}
                    disabled={buttonEventClickDisabled}
                    style={{
                        opacity: buttonEventClickDisabled ? .3 : 1
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
