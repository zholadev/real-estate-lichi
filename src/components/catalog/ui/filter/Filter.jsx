'use client'

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/shared/uikit/button";
import {useToastMessage} from "@/shared/hooks";
import {PortalProvider} from "@/shared/portals";
import useSetFilter from "../../lib/useSetFilter";
import {SidebarContainer} from "@/widgets/sidebar";
import usePushFilters from "../../lib/usePushFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import FilterList from "@/components/catalog/ui/filter/filterList/FilterList";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Filter(props) {
    const {i18n, onClick, typeContent, pageParams, typeCatalog, apartmentListData} = props

    const timerClearValue = useRef(null)

    const router = useRouter()

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const convertQueryFilter = useFilterConvertQuery()

    const [priceFrom, setPriceFrom] = useState(null)

    const [toggleFilter, setToggleFilter] = useState(false)
    const [clearSelects, setClearSelects] = useState('fill')
    const [queryFilter, setQueryFilter] = useState(convertQueryFilter(pageParams) || {})
    const [queryApiFilters, setQueryApiFilters] = useState({"filters[apartments][name][$notNull]": true})

    const [priceValue, setPriceValue] = useState('')

    const setFilterQueryHandle = (data, push) => {
        const {key, value} = data
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value, false));

        if (push) {
            sendFilterQuery()
        }
    };

    const checkDistrictValue = () => {
        if (typeCatalog === 'residential_complex') return
        if (!queryFilter?.["districts"]) {
            toastMessage("Выберите район (districts)", "error")
        }
    }

    const sendFilterQuery = () => {
        if (parseFloat(queryFilter?.["price.from"]) > queryFilter?.["price.to"]) {
            toastMessage("Вы ввели некорректные значение цен", "error")
            return
        } else if (parseFloat(queryFilter?.["price.from"]) < getMinMaxPrices?.["min"]) {
            toastMessage("Сумма не должна быть ниже минимальной цены", "error")
            return
        } else if (parseFloat(queryFilter?.["price.to"]) > getMinMaxPrices?.["max"]) {
            toastMessage("Сумма не должна быть выше максимальной цены", "error")
            return
        }
        pushFilterHandle('/catalog', queryFilter, typeCatalog === 'residential_complex')
    }

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

    const clearFilters = useCallback(() => {
        try {
            if (timerClearValue.current) {
                clearTimeout(timerClearValue.current)
            }
            setQueryFilter({})
            setPriceValue(null)
            setPriceFrom(null)
            setClearSelects('clear')
            router.replace('/catalog')

            setQueryApiFilters({})

            timerClearValue.current = setTimeout(() => {
                setClearSelects('fill')
            }, 500)
        } catch (error) {
            errorHandler("filters", "clearFilters", error)
        }
    }, [timerClearValue, router])

    const toggleFilterHandle = useCallback(() => {
        setToggleFilter(!toggleFilter)
    }, [toggleFilter])

    return (
        <>
            <div className={styles['catalog_filter_lg']}>
                <FilterList
                    i18n={i18n}
                    clearSelect={clearSelects}
                    queryFilter={queryFilter}
                    setFilterQueryHandle={setFilterQueryHandle}
                    setApiFiltersHandle={setApiFiltersHandle}
                    checkDistrictValue={checkDistrictValue}
                    queryApiFilters={queryApiFilters}
                    typeCatalog={typeCatalog}
                    getMinMaxPrices={getMinMaxPrices}
                    priceFrom={priceFrom}
                    setPriceFrom={setPriceFrom}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                />

                <Button
                    style={{
                        opacity: Object.values(queryFilter || {}).length === 0 ? .3 : 1
                    }}
                    onClick={sendFilterQuery}
                    title={i18n?.["site"]?.["search_title"]}
                    disabled={Object.values(queryFilter || {}).length === 0}
                />
            </div>

            <div className={styles['filter_panel']}>
                <ul className={styles['filter_list_actions']}>
                    {
                        Object.entries(convertQueryFilter(pageParams) || {}).map(([key, value], id) => {
                            return (
                                <li
                                    key={id}
                                    onClick={() => {
                                        setFilterQueryHandle({key: key, value: null}, true)
                                        setApiFiltersHandle({
                                            key: key === 'residence' ? `filters[apartments][residence}][name][$contains]` : `filters[apartments][${key}][type]`,
                                            value: null
                                        })
                                    }}
                                >
                                    {key}
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles['filter_switch_actions']}>
                    {
                        Object.values(queryFilter || {}).length > 0 ? (
                            <Button
                                type={'outline_light'}
                                title={i18n?.["filter.clear.title"]}
                                onClick={clearFilters}
                                style={{
                                    fontSize: "13px",
                                    lineHeight: "18.2px"
                                }}
                            />) : (
                            <div></div>
                        )}
                    <div className={styles['switch_btn']}>
                        <Button
                            type={'primary_animate'}
                            onClick={onClick}
                            animateActive={typeContent === 'list'}
                            style={{
                                fontSize: "13px",
                                lineHeight: "18.2px"
                            }}
                        >
                            <i className={`${styles['icon']} ${typeContent === "list" ? styles['invert_icon'] : ''} ${styles['icon_list']}`}/>
                        </Button>

                        <Button
                            type={'primary_animate'}
                            onClick={onClick}
                            animateActive={typeContent === 'map'}
                            style={{
                                fontSize: "13px",
                                lineHeight: "18.2px"
                            }}
                        >
                            <i className={`${styles['icon']} ${typeContent === "map" ? styles['invert_icon'] : ''} ${styles['icon_marker']}`}/>
                        </Button>
                    </div>
                </div>
            </div>

            <div className={styles['filter_sm_action']} onClick={toggleFilterHandle}>
                <div className={styles['menu']}>
                    <div className={`${styles['item']} ${styles['item_1']}`}></div>
                    <div className={`${styles['item']} ${styles['item_2']}`}></div>
                    <div className={`${styles['item']} ${styles['item_3']}`}></div>
                </div>
                <span className={styles['text']}>{i18n?.["filter.title"]}</span>
            </div>

            <PortalProvider>
                <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                    <div className={styles['catalog_filter']}>
                        <FilterList
                            i18n={i18n}
                            clearSelect={clearSelects}
                            queryFilter={queryFilter}
                            setFilterQueryHandle={setFilterQueryHandle}
                            setApiFiltersHandle={setApiFiltersHandle}
                            checkDistrictValue={checkDistrictValue}
                            queryApiFilters={queryApiFilters}
                            typeCatalog={typeCatalog}
                            getMinMaxPrices={getMinMaxPrices}
                            priceFrom={priceFrom}
                            setPriceFrom={setPriceFrom}
                            priceValue={priceValue}
                            setPriceValue={setPriceValue}
                        />

                        <Button
                            style={{
                                opacity: Object.values(queryFilter || {}).length === 0 ? .3 : 1
                            }}
                            onClick={sendFilterQuery}
                            title={i18n?.["site"]?.["search_title"]}
                            disabled={Object.values(queryFilter || {}).length === 0}
                        />

                        <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                    </div>
                </SidebarContainer>
            </PortalProvider>
        </>

    );
}

export default Filter;
