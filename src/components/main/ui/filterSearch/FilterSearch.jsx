'use client'

import React, {useEffect, useMemo, useState} from 'react';
import styles from '@/styles/main.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";
import {useApiRequest} from "@/shared/hooks";
import {
    apiGetApartmentsData,
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList
} from "@/shared/services/clientRequests";
import useSetFilter from "@/components/catalog/lib/useSetFilter";
import usePushFilters from "@/components/catalog/lib/usePushFilters";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function FilterSearch(props) {
    const {i18n} = props

    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()
    const {apiFetchHandler} = useApiRequest()

    const [queryFilter, setQueryFilter] = useState({})
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [districtDataFilter, setDistrictDataFilter] = useState([])
    const [residenceDataFilter, setResidenceFilterData] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])
    const [filterApartmentApiData, setFilterApartmentApiData] = useState({})
    const [apartmentListFilterData, setApartmentListFilterData] = useState([])

    const getApartmentData = async () => {
        let paramsCustomObject = {}

        for (let key in filterApartmentApiData) {
            const newKey = key.replace("[apartments]", "");
            paramsCustomObject[newKey] = filterApartmentApiData[key];
        }

        await apiFetchHandler(
            apiGetApartmentsData,
            [1, {"populate": false, "fields[0]": "name", "fields[1]": "price", ...paramsCustomObject}],
            false,
            {
                onGetData: (params) => {
                    setApartmentListFilterData(params.data?.["data"]?.["data"])
                }
            }
        )
    }

    useEffect(() => {
        getApartmentData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [filterApartmentApiData]);

    const getFilterResidenceData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [{"filters[apartments][name][$notNull]": true}], false, {
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
        await apiFetchHandler(apiGetFilterRoomsList, [{"filters[apartments][name][$notNull]": true}], false, {
            onGetData: (params) => {
                setRoomsDataFilter(params.api_data)
            }
        })
    }

    const getFilterPropertyData = async () => {
        await apiFetchHandler(apiGetFilterPropertyTypeList, [{"filters[apartments][name][$notNull]": true}], false, {
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
    }, []);

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

    const setFilterQueryHandle = (data) => {
        const {key, value} = data
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value, true));
    };

    const setFilterApiHandle = (data) => {
        const {key, value} = data
        setFilterApartmentApiData((prevFilters) => getSetFilterHandle(prevFilters, key, value, true));
    };

    const sendFilterQuery = () => pushFilterHandle('/catalog', queryFilter)

    const currentValueDistrict = optionsDistrict?.filter((item) => {
        if (Array.isArray(queryFilter?.['districts'])) {
            return queryFilter?.['districts'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === queryFilter?.['districts']
        }
    })

    const currentValueResidence = optionsResidence?.filter((item) => {
        if (Array.isArray(queryFilter?.['residence'])) {
            return queryFilter?.['residence'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === queryFilter?.['residence']
        }
    })

    const currentValueRooms = optionsRooms?.filter((item) => {
        if (Array.isArray(queryFilter?.['rooms'])) {
            return queryFilter?.['rooms'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === queryFilter?.['rooms']
        }
    })

    const currentValueProperty = optionsPropertyType?.filter((item) => {
        if (Array.isArray(queryFilter?.['property_types'])) {
            return queryFilter?.['property_types'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === queryFilter?.['property_types']
        }
    })

    const currentButtonTitle = useMemo(() => {
        if (Object.values(queryFilter || {}).length > 0) {
            return `${i18n?.["site"]?.["search_title"]} (${apartmentListFilterData.length})`
        } else {
            return i18n?.["site"]?.["search_title"]
        }
    }, [i18n, queryFilter, apartmentListFilterData])

    const buttonEventClickDisabled = useMemo(() => {
        if (queryFilter.length === 0) return false
        return (apartmentListFilterData.length > 0)
    }, [queryFilter, apartmentListFilterData])

    return (
        <div className={styles['main_form_investing']}>
            <div className={styles['title']}>{i18n?.["main"]?.["form_investing_title"]}</div>
            <div className={styles['subtitle']}>{i18n?.["main"]?.["form_investing_subtitle"]}</div>

            <form className={`${styles['form_investing']}`}>
                <div className={styles['form_box']}>
                    <FormSelect
                        i18n={i18n}
                        placeholder={i18n?.["site.district.title"]}
                        options={optionsDistrict}
                        value={currentValueDistrict}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setFilterApiHandle({
                                key: 'filters[apartments][districts][type]',
                                value: e?.value
                            })
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        i18n={i18n}
                        placeholder={i18n?.["site.residence.title"]}
                        options={optionsResidence}
                        value={currentValueResidence}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setFilterApiHandle({
                                key: 'filters[apartments][residence][name][$contains]',
                                value: e?.value
                            })
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        i18n={i18n}
                        placeholder={i18n?.["site.roominess.title"]}
                        options={optionsRooms}
                        value={currentValueRooms}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setFilterApiHandle({
                                key: 'filters[apartments][rooms][type]',
                                value: e?.value
                            })
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        i18n={i18n}
                        placeholder={i18n?.["site.property.type.title"]}
                        options={optionsPropertyType}
                        value={currentValueProperty}
                        onChange={e => {
                            setFilterQueryHandle(e)
                            setFilterApiHandle({
                                key: 'filters[apartments][property_types][type]',
                                value: e?.value
                            })
                        }}
                    />
                </div>

            </form>

            <Button
                title={currentButtonTitle}
                onClick={sendFilterQuery}
                disabled={!buttonEventClickDisabled}
                style={{minWidth: "303px", opacity: !buttonEventClickDisabled ? .5 : 1}}
            />
        </div>
    );
}

export default FilterSearch;
