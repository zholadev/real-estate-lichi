'use client'

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/shared/uikit/button";
import {Input} from "@/shared/uikit/form/input";
import {PortalProvider} from "@/shared/portals";
import {SidebarContainer} from "@/widgets/sidebar";
import usePushFilters from "../../lib/usePushFilters";
import styles from '@/styles/catalog-filter.module.sass'
import {useToastMessage} from "@/shared/hooks";
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList,
    apiGetFilterTagsList
} from "@/shared/services/clientRequests";
import useSetFilter from "../../lib/useSetFilter";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterConvertQuery from "../../lib/useFilterConvertQuery";
import FilterDistrict from "./filterTypes/FilterDistrict";
import FilterResidence from "./filterTypes/FilterResidence";
import FilterRooms from "./filterTypes/FilterRooms";
import FilterPropertyType from "./filterTypes/FilterPropertyType";
import FilterTags from "./filterTypes/FilterTags";

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

    const [queryFilter, setQueryFilter] = useState(convertQueryFilter(pageParams) || {})
    const [toggleFilter, setToggleFilter] = useState(false)
    const [clearSelects, setClearSelects] = useState('fill')
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
        if (queryFilter?.["districts"]) return
        if (!queryFilter?.["districts"]) {
            toastMessage("Выберите район (districts)", "error")
        }
    }

    const sendFilterQuery = () => {
        if (parseFloat(queryFilter?.["price.from"]) > queryFilter?.["price.to"]) {
            toastMessage("Вы ввели некорректные значение цен", "error")
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
                <FilterDistrict
                    i18n={i18n}
                    filterType={"districts"}
                    clearSelect={clearSelects}
                    value={queryFilter?.["districts"]}
                    filterApi={apiGetFilterDistrictList}
                    assemblyFilter={setFilterQueryHandle}
                    assemblyFilterApi={setApiFiltersHandle}
                    defaultValue={queryFilter?.["districts"]}
                    placeholder={i18n?.["site.district.title"]}
                    filterApiParams={typeCatalog === 'residential_complex' ? {"filters[residential_complexes][name][$notNull]": true} : {"filters[apartments][name][$notNull]": true}}
                />

                {
                    typeCatalog !== 'residential_complex' &&
                    <FilterResidence
                        i18n={i18n}
                        filterType={"residence"}
                        value={queryFilter?.["residence"]}
                        clearSelect={clearSelects}
                        disabled={!queryFilter?.["districts"]}
                        filterApi={apiGetFilterResidenceList}
                        assemblyFilter={setFilterQueryHandle}
                        onClickContainer={checkDistrictValue}
                        assemblyFilterApi={setApiFiltersHandle}
                        placeholder={i18n?.["site.residence.title"]}
                        filterApiParams={queryApiFilters}
                    />
                }

                <FilterRooms
                    i18n={i18n}
                    filterType={"rooms"}
                    clearSelect={clearSelects}
                    value={queryFilter?.["rooms"]}
                    disabled={!queryFilter?.["districts"]}
                    filterApi={apiGetFilterRoomsList}
                    assemblyFilter={setFilterQueryHandle}
                    onClickContainer={checkDistrictValue}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.roominess.title"]}
                    filterApiParams={queryApiFilters}
                />

                <FilterPropertyType
                    i18n={i18n}
                    filterType={"property_types"}
                    clearSelect={clearSelects}
                    value={queryFilter?.["property_types"]}
                    disabled={!queryFilter?.["districts"]}
                    filterApi={apiGetFilterPropertyTypeList}
                    assemblyFilter={setFilterQueryHandle}
                    onClickContainer={checkDistrictValue}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.property.type.title"]}
                    filterApiParams={queryApiFilters}
                />

                <FilterTags
                    i18n={i18n}
                    filterType={"tags"}
                    value={queryFilter?.["tags"]}
                    clearSelect={clearSelects}
                    disabled={!queryFilter?.["districts"]}
                    filterApi={apiGetFilterTagsList}
                    assemblyFilter={setFilterQueryHandle}
                    onClickContainer={checkDistrictValue}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.tags.title"]}
                    filterApiParams={queryApiFilters}
                />

                <Input
                    id={"price"}
                    i18n={i18n}
                    type={"number"}
                    placeholder={Object.values(queryFilter || {}).length > 0 && getMinMaxPrices?.["min"] || i18n?.["site.coast.from.title"]}
                    value={priceFrom}
                    disabled={Object.values(queryFilter || {}).length > 0}
                    onChange={(e) => {
                        setPriceFrom(e)
                        setFilterQueryHandle({key: "price.from", value: e})
                        setApiFiltersHandle({
                            key: "filters[apartments][price][$gte]",
                            value: e
                        })
                    }}
                    typeInput={'secondary'}
                />

                <Input
                    id={"price"}
                    i18n={i18n}
                    type={"number"}
                    placeholder={Object.values(queryFilter || {}).length > 0 && getMinMaxPrices?.["max"] || i18n?.["site.coast.to.title"]}
                    value={priceValue}
                    disabled={Object.values(queryFilter || {}).length > 0}
                    onChange={(e) => {
                        setPriceValue(e)
                        setFilterQueryHandle(e)
                        setFilterQueryHandle({key: "price.to", value: e})
                        setApiFiltersHandle({
                            key: "filters[apartments][price][$lte]",
                            value: e
                        })
                    }}
                    typeInput={'secondary'}
                />

                <Button title={i18n?.["site"]?.["search_title"]} onClick={sendFilterQuery}/>
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
            <div className={styles['catalog_filter_sm']}>
                {/*<FormSelect*/}
                {/*    placeholder={i18n?.["site.residence.title"]}*/}
                {/*    options={optionsResidence}*/}
                {/*    onChange={e => {*/}
                {/*        if (e) {*/}
                {/*            setFilterQueryHandle(e)*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}

                <Button title={i18n?.["site"]?.["search_title"]} onClick={sendFilterQuery}/>
            </div>

            <PortalProvider>
                <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                    <div className={styles['catalog_filter']}>
                        {/*<FormSelect*/}
                        {/*    placeholder={i18n?.["site.residence.title"]}*/}
                        {/*    options={optionsResidence}*/}
                        {/*    onChange={e => {*/}
                        {/*        if (e) {*/}
                        {/*            setFilterQueryHandle(e)*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}

                        {/*<FormSelect*/}
                        {/*    placeholder={i18n?.["site.district.title"]}*/}
                        {/*    options={optionsDistrict}*/}
                        {/*    onChange={e => {*/}
                        {/*        if (e) {*/}
                        {/*            setFilterQueryHandle(e)*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}

                        {/*<FormSelect*/}
                        {/*    placeholder={i18n?.["site.roominess.title"]}*/}
                        {/*    options={optionsRooms}*/}
                        {/*    onChange={e => {*/}
                        {/*        if (e) {*/}
                        {/*            setFilterQueryHandle(e)*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}


                        {/*<FormSelect*/}
                        {/*    placeholder={i18n?.["site.property.type.title"]}*/}
                        {/*    options={optionsPropertyType}*/}
                        {/*    onChange={e => {*/}
                        {/*        if (e) {*/}
                        {/*            setFilterQueryHandle(e)*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}

                        {/*<FormSelect*/}
                        {/*    placeholder={i18n?.["site.tags.title"]}*/}
                        {/*    options={optionsTags}*/}
                        {/*    onChange={e => {*/}
                        {/*        if (e) {*/}
                        {/*            setFilterQueryHandle(e)*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <Input
                            id={"price"}
                            type={"number"}
                            placeholder={i18n?.["site.coast_price.title"]}
                            value={priceValue}
                            onChange={(e) => {
                                setPriceValue(e)
                                setFilterQueryHandle({key: "price", value: e})
                            }}
                            typeInput={'secondary'}
                        />

                        <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                        <Button title={i18n?.["site"]?.["search_title"]} onClick={sendFilterQuery}/>
                    </div>
                </SidebarContainer>
            </PortalProvider>
        </>

    );
}

export default Filter;
