'use client'

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Tabs} from "@/shared/uikit/tabs";
import {Button} from "@/shared/uikit/button";
import {PortalProvider} from "@/shared/portals";
import useSetFilter from "../../lib/useSetFilter";
import FilterList from "./filterList/FilterList";
import {SidebarContainer} from "@/widgets/sidebar";
import usePushFilters from "../../lib/usePushFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {useRouter, useSearchParams} from "next/navigation";
import FilterIconMenu from "./filterIconMenu/FilterIconMenu";
import FilterBottomPanel from "./filterBottom/FilterBottomPanel";
import {useMediaMaxState, useToastMessage} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import {routerPage} from "@/entities/router/model/pages";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Filter(props) {
    const {i18n, onClick, typeContent, pageParams, typeCatalog, apartmentListData, setTypeCatalog, tabData} = props

    const timerClearValue = useRef(null)

    const router = useRouter()
    const query = useSearchParams()

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const convertQueryFilter = useFilterConvertQuery()

    const mediaQuerySm = useMediaMaxState({screenSize: 576})

    const [priceFrom, setPriceFrom] = useState(null)
    const [priceValue, setPriceValue] = useState('')
    const [toggleFilter, setToggleFilter] = useState(false)
    const [clearSelects, setClearSelects] = useState('fill')
    const [queryFilter, setQueryFilter] = useState(convertQueryFilter(pageParams) || {})
    const [queryApiFilters, setQueryApiFilters] = useState({"filters[apartments][name][$notNull]": true})

    const FILTER_DATA = Object.values(queryFilter || {})
    const FILTER_QUERY_DATA = Object.entries(convertQueryFilter(pageParams) || {})

    const toggleFilterHandle = () => setToggleFilter(!toggleFilter);

    /**
     * Handles setting the filter query based on provided data
     *
     * @param {Object} filterData - The filter data to be set paired with its associated key
     */
    const setFilterQueryHandle = (filterData) => {
        const {key, value} = filterData
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value));
    };

    const checkDistrictValue = useCallback(() => {
        // if (typeCatalog === 'residential_complex') return
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
    }

    const getMinMaxPrices = useMemo(() => {
        try {
            const prices = Object.values(apartmentListData || {}).map((item) => item?.["attributes"]?.["price"])
            return {
                "min": Math.min(...prices),
                "max": Math.max(...prices)
            }
        } catch (error) {
            errorHandler("filter", "getMinMaxPrices", error)
        }
    }, [apartmentListData])

    const sendFilterQuery = (filterData, filterToggle) => {
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

        if (filterData) {
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

            setQueryApiFilters({})

            timerClearValue.current = setTimeout(() => {
                setClearSelects('fill')
            }, 500)
        } catch (error) {
            errorHandler("filters", "clearFilters", error)
        }
    }, [timerClearValue, router])

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
                    queryApiFilters={queryApiFilters}
                    getMinMaxPrices={getMinMaxPrices}
                    checkDistrictValue={checkDistrictValue}
                    setApiFiltersHandle={setApiFiltersHandle}
                    setFilterQueryHandle={setFilterQueryHandle}
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

            <PortalProvider>
                <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                    <div className={styles['catalog_filter']}>
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
                            queryApiFilters={queryApiFilters}
                            getMinMaxPrices={getMinMaxPrices}
                            checkDistrictValue={checkDistrictValue}
                            setApiFiltersHandle={setApiFiltersHandle}
                            setFilterQueryHandle={setFilterQueryHandle}
                        />

                        <Button
                            onClick={sendFilterQuery}
                            title={i18n?.["site"]?.["search_title"]}
                            disabled={FILTER_DATA.length === 0}
                            style={{
                                opacity: FILTER_DATA.length === 0 ? .3 : 1
                            }}
                        />

                        <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                    </div>
                </SidebarContainer>
            </PortalProvider>
        </>

    );
}

export default Filter;
