import React, {useEffect, useMemo, useState} from 'react';
import styles from '@/styles/main.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";
import {useApiRequest} from "@/shared/hooks";
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList
} from "@/shared/services/clientRequests";
import qs from "qs";
import {useRouter} from "next/navigation";
import usePushFilters from "@/components/catalog/lib/usePushFilters";
import useSetFilter from "@/components/catalog/lib/useSetFilter";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainFormInvesting(props) {
    const {i18n} = props

    const router = useRouter()

    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()

    const {apiFetchHandler, loading} = useApiRequest()

    const [queryFilter, setQueryFilter] = useState({})
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [districtDataFilter, setDistrictDataFilter] = useState([])
    const [residenceDataFilter, setResidenceFilterData] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])

    const getFilterResidenceData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [], false, {
            onGetData: (params) => {
                setResidenceFilterData(params.api_data)
            }
        })
    }

    const getFilterDistrictData = async () => {
        await apiFetchHandler(apiGetFilterDistrictList, [], false, {
            onGetData: (params) => {
                setDistrictDataFilter(params.api_data)
            }
        })
    }

    const getFilterRoomsData = async () => {
        await apiFetchHandler(apiGetFilterRoomsList, [], false, {
            onGetData: (params) => {
                setRoomsDataFilter(params.api_data)
            }
        })
    }

    const getFilterPropertyData = async () => {
        await apiFetchHandler(apiGetFilterPropertyTypeList, [], false, {
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
                    key: "district"
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
                    key: "property_type"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [propertyTypeDataFilter])


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
                        placeholder={i18n?.["site.residence.title"]}
                        options={optionsResidence}
                        onChange={e => {
                            setFilterQueryHandle(e)
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.district.title"]}
                        options={optionsDistrict}
                        onChange={e => {
                            setFilterQueryHandle(e)
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.roominess.title"]}
                        options={optionsRooms}
                        onChange={e => {
                            setFilterQueryHandle(e)
                        }}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["site.property.type.title"]}
                        options={optionsPropertyType}
                        onChange={e => {
                            setFilterQueryHandle(e)
                        }}
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

export default MainFormInvesting;
