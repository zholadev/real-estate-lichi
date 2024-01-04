'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from '@/styles/main.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";
import {useApiRequest, useToastMessage} from "@/shared/hooks";
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList
} from "@/shared/services/clientRequests";
import useSetFilter from "@/components/catalog/lib/useSetFilter";
import usePushFilters from "@/components/catalog/lib/usePushFilters";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainSearchObject(props) {
    const {i18n} = props

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const {apiFetchHandler} = useApiRequest()

    const [queryFilter, setQueryFilter] = useState({})
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [districtDataFilter, setDistrictDataFilter] = useState([])
    const [residenceDataFilter, setResidenceFilterData] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])
    const [queryApiFilters, setQueryApiFilters] = useState({"filters[apartments][name][$notNull]": true})

    const getFilterResidenceData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [queryApiFilters], false, {
            onGetData: (params) => {
                setResidenceFilterData(params.api_data)
            }
        })
    }

    const getFilterDistrictData = async () => {
        await apiFetchHandler(apiGetFilterDistrictList, [{"filters[apartments][name][$notNull]": true}], false, {
            onGetData: (params) => {
                setDistrictDataFilter(params.api_data)
            }
        })
    }

    const getFilterRoomsData = async () => {
        await apiFetchHandler(apiGetFilterRoomsList, [queryApiFilters], false, {
            onGetData: (params) => {
                setRoomsDataFilter(params.api_data)
            }
        })
    }

    const getFilterPropertyData = async () => {
        await apiFetchHandler(apiGetFilterPropertyTypeList, [queryApiFilters], false, {
            onGetData: (params) => {
                setPropertyTypeFilterData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterResidenceData().catch(e => console.log(e))
        getFilterDistrictData().catch(e => console.log(e))
        getFilterRoomsData().catch(e => console.log(e))
        getFilterPropertyData().catch(e => console.log(e))

        return () => {
            setResidenceFilterData([])
            setDistrictDataFilter([])
            setRoomsDataFilter([])
            setPropertyTypeFilterData([])
        }
    }, [queryApiFilters]);

    const optionsResidence = useMemo(() => {
        try {
            return residenceDataFilter.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["name"],
                    key: "residence"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [residenceDataFilter])

    const optionsDistrict = useMemo(() => {
        try {
            return districtDataFilter.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "districts"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [districtDataFilter])

    const optionsRooms = useMemo(() => {
        try {
            return roomsDataFilter.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "rooms"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [roomsDataFilter])

    const optionsPropertyType = useMemo(() => {
        try {
            return propertyTypeDataFilter.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "property_types"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [propertyTypeDataFilter])

    const setApiFiltersHandle = (data) => {
        const {key, value} = data

        setQueryApiFilters(prevFilter => {
            return {
                ...prevFilter,
                [key]: value,
            }
        })
    }

    const checkDistrictValue = useCallback(() => {
        if (queryFilter?.["districts"]) return
        if (!queryFilter?.["districts"]) {
            toastMessage("Выберите район (districts)", "error")
        }
    }, [queryFilter])

    const setFilterQueryHandle = (data) => {
        const {key, value} = data
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value, false));
    };

    const sendFilterQuery = () => pushFilterHandle('/catalog', queryFilter)

    return (
        <div className={styles['main_form_investing']}>
            <div className={styles['title']}>{i18n?.["main"]?.["form_investing_title"]}</div>
            <div className={styles['subtitle']}>{i18n?.["main"]?.["form_investing_subtitle"]}</div>

            <form className={`${styles['form_investing']}`}>
                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.district.title"]}
                        options={optionsDistrict}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setApiFiltersHandle({
                                key: 'filters[apartments][districts][type]',
                                value: e?.value
                            })
                        }}
                        onClickContainer={checkDistrictValue}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.residence.title"]}
                        options={optionsResidence}
                        disabled={!queryFilter?.["districts"]}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setApiFiltersHandle({
                                key: 'filters[apartments][residence][name][$contains]',
                                value: e?.value
                            })
                        }}
                        onClickContainer={checkDistrictValue}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.roominess.title"]}
                        options={optionsRooms}
                        disabled={!queryFilter?.["districts"]}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setApiFiltersHandle({
                                key: 'filters[apartments][rooms][type]',
                                value: e?.value
                            })
                        }}
                        onClickContainer={checkDistrictValue}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.property.type.title"]}
                        options={optionsPropertyType}
                        disabled={!queryFilter?.["districts"]}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setApiFiltersHandle({
                                key: 'filters[apartments][property_types][type]',
                                value: e?.value
                            })
                        }}
                        onClickContainer={checkDistrictValue}
                    />
                </div>

            </form>

            <Button
                title={i18n?.["site"]?.["search_title"]}
                style={{minWidth: "303px"}}
                onClick={sendFilterQuery}
            />
        </div>
    );
}

export default MainSearchObject;
