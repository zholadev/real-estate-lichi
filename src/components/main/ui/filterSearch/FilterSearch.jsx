

import React, {useEffect, useMemo} from 'react';
import {
    apiGetApartmentsData,
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList
} from "@/shared/services/clientRequests";
import {Button} from "@/shared/uikit/button";
import styles from '@/styles/main.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {useAppSelector} from "@/entities/store/hooks/hooks";
import {useApiRequest, useDispatchHandler} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import usePushFilters from "@/components/catalog/lib/usePushFilters";

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

    const app = useDispatchHandler()
    const pushFilterHandle = usePushFilters()

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        filterQueryData,
        filterRoomsData,
        filterDistrictData,
        filterResidenceData,
        filterPropertyTypeData,
        filterApartmentListData,
        filterQueryApartmentData
    } = useAppSelector(state => state?.filterMiniSearchSlice)

    const getApartmentData = async () => {
        let paramsCustomObject = {}

        for (let key in filterQueryApartmentData) {
            const newKey = key.replace("[apartments]", "");
            paramsCustomObject[newKey] = filterQueryApartmentData[key];
        }

        await apiFetchHandler(
            apiGetApartmentsData,
            [1, {"populate": false, "fields[0]": "name", "fields[1]": "price", ...paramsCustomObject}],
            false,
            {
                onGetData: (params) => {
                    app.filterSearchApartmentListDataAction(params.api_data)
                }
            }
        )
    }

    useEffect(() => {
        getApartmentData()
            .catch(error => {
                errorHandler("filterSearch", "useEffect", error)
            })
    }, [filterQueryApartmentData]);

    const getFilterResidenceData = async () => {
        await apiFetchHandler(
            apiGetFilterResidenceList,
            [{"filters[apartments][name][$notNull]": true}],
            false,
            {
                onGetData: (params) => {
                    app.filterSearchResidenceDataAction(params.api_data)
                }
            }
        )
    }

    const getFilterDistrictData = async () => {
        await apiFetchHandler(
            apiGetFilterDistrictList,
            [{"filters[apartments][name][$notNull]": true}],
            false,
            {
                onGetData: (params) => {
                    app.filterSearchDistrictDataAction(params.api_data)
                }
            }
        )
    }

    const getFilterRoomsData = async () => {
        await apiFetchHandler(
            apiGetFilterRoomsList,
            [{"filters[apartments][name][$notNull]": true}],
            false,
            {
                onGetData: (params) => {
                    app.filterSearchRoomsDataAction(params.api_data)
                }
            }
        )
    }

    const getFilterPropertyData = async () => {
        await apiFetchHandler(
            apiGetFilterPropertyTypeList,
            [{"filters[apartments][name][$notNull]": true}],
            false,
            {
                onGetData: (params) => {
                    app.filterSearchPropertyTypeDataAction(params.api_data)
                }
            }
        )
    }

    useEffect(() => {
        getFilterResidenceData().catch(e => console.log(e))
        getFilterDistrictData().catch(e => console.log(e))
        getFilterRoomsData().catch(e => console.log(e))
        getFilterPropertyData().catch(e => console.log(e))
    }, []);

    const optionsResidence = useMemo(() => {
        try {
            return filterResidenceData.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["name"],
                    key: "residence"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [filterResidenceData])

    const optionsDistrict = useMemo(() => {
        try {
            return filterDistrictData.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "districts"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [filterDistrictData])

    const optionsRooms = useMemo(() => {
        try {
            return filterRoomsData.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "rooms"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [filterRoomsData])

    const optionsPropertyType = useMemo(() => {
        try {
            return filterPropertyTypeData.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "property_types"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [filterPropertyTypeData])

    const setFilterQueryHandle = (data) => app.filterSearchQueryDataAction(data)
    const setFilterApiHandle = (data) => app.filterSearchQueryApartmentDataAction(data)

    const sendFilterQuery = () => pushFilterHandle('/catalog', filterQueryData)

    const currentValueDistrict = optionsDistrict?.filter((item) => {
        if (Array.isArray(filterQueryData?.['districts'])) {
            return filterQueryData?.['districts'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === filterQueryData?.['districts']
        }
    })

    const currentValueResidence = optionsResidence?.filter((item) => {
        if (Array.isArray(filterQueryData?.['residence'])) {
            return filterQueryData?.['residence'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === filterQueryData?.['residence']
        }
    })

    const currentValueRooms = optionsRooms?.filter((item) => {
        if (Array.isArray(filterQueryData?.['rooms'])) {
            return filterQueryData?.['rooms'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === filterQueryData?.['rooms']
        }
    })

    const currentValueProperty = optionsPropertyType?.filter((item) => {
        if (Array.isArray(filterQueryData?.['property_types'])) {
            return filterQueryData?.['property_types'].some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === filterQueryData?.['property_types']
        }
    })

    const currentButtonTitle = useMemo(() => {
        if (Object.values(filterQueryData || {}).length > 0) {
            return `${i18n?.["site"]?.["search_title"]} (${filterApartmentListData.length})`
        } else {
            return i18n?.["site"]?.["search_title"]
        }
    }, [i18n, filterQueryData, filterApartmentListData])

    const buttonEventClickDisabled = useMemo(() => {
        if (filterQueryData.length === 0) return false
        return (filterApartmentListData?.length > 0)
    }, [filterQueryData, filterApartmentListData])

    useEffect(() => {
        return () => {
            app.filterMiniSearchResetAction()
        }
    }, []);

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
                loader={loading}
                disabled={!buttonEventClickDisabled}
                style={{minWidth: "303px", opacity: !buttonEventClickDisabled ? .5 : 1}}
            />
        </div>
    );
}

export default FilterSearch;
