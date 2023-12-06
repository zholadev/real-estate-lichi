'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from '@/styles/catalog-filter.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";
import {PortalProvider} from "@/shared/portals";
import {SidebarContainer} from "@/widgets/sidebar";
import {useApiRequest} from "@/shared/hooks";
import {Input} from "@/shared/uikit/form/input";
import usePushFilters from "../../lib/usePushFilters";
import {useRouter} from "next/navigation";
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList,
    apiGetFilterTagsList
} from "@/shared/services/clientRequests";
import useSetFilter from "../../lib/useSetFilter";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Filter(props) {
    const {i18n, pageParams} = props

    const router = useRouter()

    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()

    const {apiFetchHandler} = useApiRequest()

    const [queryFilter, setQueryFilter] = useState({})
    const [tagDataFilter, setTagDataFilter] = useState([])
    const [toggleFilter, setToggleFilter] = useState(false)
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [districtDataFilter, setDistrictDataFilter] = useState([])
    const [residenceDataFilter, setResidenceFilterData] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])

    const [priceValue, setPriceValue] = useState(0)

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

    const getFilterTagsData = async () => {
        await apiFetchHandler(apiGetFilterTagsList, [], false, {
            onGetData: (params) => {
                setTagDataFilter(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterResidenceData().catch(e => console.log(e))
        getFilterDistrictData().catch(e => console.log(e))
        getFilterRoomsData().catch(e => console.log(e))
        getFilterPropertyData().catch(e => console.log(e))
        getFilterTagsData().catch(e => console.log(e))
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

    const optionsTags = useMemo(() => {
        try {
            return tagDataFilter.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: "tags"
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [tagDataFilter])

    const setFilterQueryHandle = (data) => {
        const {key, value} = data
        setQueryFilter((prevFilters) => getSetFilterHandle(prevFilters, key, value, false));
    };

    const sendFilterQuery = () => pushFilterHandle('/catalog', queryFilter)

    const clearFilters = () => {
        setQueryFilter({})
        router.replace('/catalog')
    }

    const toggleFilterHandle = useCallback(() => {
        setToggleFilter(!toggleFilter)
    }, [toggleFilter])

    return (
        <>
            <div className={styles['catalog_filter_lg']}>
                <FormSelect
                    placeholder={i18n?.["site.residence.title"]}
                    options={optionsResidence}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />

                <FormSelect
                    placeholder={i18n?.["site.district.title"]}
                    options={optionsDistrict}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />

                <FormSelect
                    placeholder={i18n?.["site.roominess.title"]}
                    options={optionsRooms}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />


                <FormSelect
                    placeholder={i18n?.["site.property.type.title"]}
                    options={optionsPropertyType}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />

                <FormSelect
                    placeholder={i18n?.["site.tags.title"]}
                    options={optionsTags}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />

                <Input
                    id={"price"}
                    type={"number"}
                    label={i18n?.["site.coast_price.title"]}
                    value={priceValue}
                    labelActive
                    onChange={(e) => {
                        setPriceValue(e)
                        setFilterQueryHandle({key: "price", value: e})
                    }}
                    typeInput={'secondary'}
                />

                <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                <Button title={i18n?.["site"]?.["search_title"]} onClick={sendFilterQuery}/>
            </div>

            <div className={styles['filter_sm_action']} onClick={toggleFilterHandle}>
                <div className={styles['menu']}>
                    <div className={`${styles['item']} ${styles['item_1']}`}></div>
                    <div className={`${styles['item']} ${styles['item_2']}`}></div>
                    <div className={`${styles['item']} ${styles['item_3']}`}></div>
                </div>
                <span className={styles['text']}>Больше фильтров</span>
            </div>
            <div className={styles['catalog_filter_sm']}>
                <FormSelect
                    placeholder={i18n?.["site.residence.title"]}
                    options={optionsResidence}
                    onChange={e => {
                        setFilterQueryHandle(e)
                    }}
                />

                <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                <Button title={i18n?.["site"]?.["search_title"]} onClick={sendFilterQuery}/>
            </div>

            <PortalProvider>
                <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                    <div className={styles['catalog_filter']}>
                        <FormSelect
                            placeholder={i18n?.["site.residence.title"]}
                            options={optionsResidence}
                            onChange={e => {
                                setFilterQueryHandle(e)
                            }}
                        />

                        <FormSelect
                            placeholder={i18n?.["site.district.title"]}
                            options={optionsDistrict}
                            onChange={e => {
                                setFilterQueryHandle(e)
                            }}
                        />

                        <FormSelect
                            placeholder={i18n?.["site.roominess.title"]}
                            options={optionsRooms}
                            onChange={e => {
                                setFilterQueryHandle(e)
                            }}
                        />


                        <FormSelect
                            placeholder={i18n?.["site.property.type.title"]}
                            options={optionsPropertyType}
                            onChange={e => {
                                setFilterQueryHandle(e)
                            }}
                        />

                        <FormSelect
                            placeholder={i18n?.["site.tags.title"]}
                            options={optionsTags}
                            onChange={e => {
                                setFilterQueryHandle(e)
                            }}
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
