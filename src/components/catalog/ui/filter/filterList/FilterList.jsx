import React, {useEffect, useState} from 'react';
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList,
    apiGetFilterTagsList
} from "@/shared/services/clientRequests";
import {useApiRequest} from "@/shared/hooks";
import {Input} from "@/shared/uikit/form/input";
import FilterTags from "../filterTypes/FilterTags";
import FilterRooms from "../filterTypes/FilterRooms";
import FilterDistrict from "../filterTypes/FilterDistrict";
import FilterResidence from "../filterTypes/FilterResidence";
import FilterPropertyType from "../filterTypes/FilterPropertyType";
import useDebounce from "@/shared/hooks/model/useDebounce";

/**
 * @author Zholaman Zhumanov
 * @created 04.01.2024
 * @param props
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function FilterList(props) {
    const {
        i18n,
        priceFrom,
        priceValue,
        queryFilter,
        typeCatalog,
        clearFilters,
        setPriceFrom,
        clearSelects,
        setPriceValue,
        getMinMaxPrices,
        queryApiFilters,
        getApartmentData,
        setFilterAllData,
        setApiFiltersHandle,
        setFilterQueryHandle,
    } = props

    const {apiFetchHandler, loading} = useApiRequest()

    const [tagDataFilter, setTagDataFilter] = useState([])
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [districtDataFilter, setDistrictDataFilter] = useState([])
    const [residenceDataFilter, setResidenceFilterData] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])

    const [tagStaticDataFilter, setTagStaticDataFilter] = useState([])
    const [roomsStaticDataFilter, setRoomsStaticDataFilter] = useState([])
    const [districtStaticDataFilter, setDistrictStaticDataFilter] = useState([])
    const [residenceStaticDataFilter, setResidenceStaticFilterData] = useState([])
    const [propertyStaticTypeDataFilter, setPropertyTypeStaticFilterData] = useState([])

    /**
     * @description Districts Data
     * @returns {Promise<void>}
     */
    const getFilterDistrictData = async () => {
        await apiFetchHandler(
            apiGetFilterDistrictList,
            [queryApiFilters],
            false,
            {
                onGetData: (params) => {
                    if (districtStaticDataFilter.length === 0) {
                        setDistrictStaticDataFilter(params.api_data)
                        return
                    }
                    setDistrictDataFilter(params.api_data)
                }
            }
        )
    }

    /**
     * @description Residence Data
     * @returns {Promise<void>}
     */
    const getFilterResidenceData = async () => {
        await apiFetchHandler(
            apiGetFilterResidenceList,
            [queryApiFilters],
            false,
            {
                onGetData: (params) => {
                    if (residenceStaticDataFilter.length === 0) {
                        setResidenceStaticFilterData(params.api_data)
                        return
                    }
                    setResidenceFilterData(params.api_data)
                }
            }
        )
    }

    /**
     * @description Rooms Data
     * @returns {Promise<void>}
     */
    const getFilterRoomsData = async () => {
        await apiFetchHandler(
            apiGetFilterRoomsList,
            [queryApiFilters],
            false,
            {
                onGetData: (params) => {
                    if (roomsStaticDataFilter.length === 0) {
                        setRoomsStaticDataFilter(params.api_data)
                        return
                    }
                    setRoomsDataFilter(params.api_data)
                }
            }
        )
    }

    /**
     * @description Property Type Data
     * @returns {Promise<void>}
     */
    const getFilterPropertyData = async () => {
        await apiFetchHandler(
            apiGetFilterPropertyTypeList,
            [queryApiFilters],
            false,
            {
                onGetData: (params) => {
                    if (propertyStaticTypeDataFilter.length === 0) {
                        setPropertyTypeStaticFilterData(params.api_data)
                        return
                    }
                    setPropertyTypeFilterData(params.api_data)
                }
            }
        )
    }

    /**
     * @description Tags Data
     * @returns {Promise<void>}
     */
    const getFilterTagsData = async () => {
        await apiFetchHandler(
            apiGetFilterTagsList,
            [queryApiFilters],
            false,
            {
                onGetData: (params) => {
                    if (tagStaticDataFilter.length === 0) {
                        setTagStaticDataFilter(params.api_data)
                    }
                    setTagDataFilter(params.api_data)
                }
            }
        )
    }

    const priceOnChangeDebounce = useDebounce()

    const priceOnChangeHandle = (priceData) => {
        const {data, name, type} = priceData
        setFilterQueryHandle({key: name, value: data})
        setApiFiltersHandle({
            key: `filters[apartments][price][${type}]`,
            value: data
        })
    }

    useEffect(() => {
        getFilterDistrictData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })

        getFilterPropertyData()
            .catch(error => {
                errorHandler("filterPropertyType", "useEffect", error)
            })

        getFilterTagsData()
            .catch(error => {
                errorHandler("filterTags", "useEffect", error)
            })

        getFilterRoomsData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })

        getFilterResidenceData()
            .catch(error => {
                errorHandler("filterResidence", "useEffect", error)
            })
    }, [queryApiFilters]);

    useEffect(() => {
        try {
            setFilterAllData([...districtStaticDataFilter, ...roomsStaticDataFilter, ...tagStaticDataFilter, ...residenceStaticDataFilter, ...propertyStaticTypeDataFilter])
        } catch (error) {
            errorHandler("filterList", "set filters all data", error)
        }
    }, [
        districtStaticDataFilter,
        roomsStaticDataFilter,
        tagStaticDataFilter,
        residenceStaticDataFilter,
        propertyStaticTypeDataFilter
    ]);

    return (
        <>
            <FilterDistrict
                i18n={i18n}
                loading={loading}
                filterType={"districts"}
                clearSelect={clearSelects}
                clearFilters={clearFilters}
                value={queryFilter?.["districts"]}
                getApartmentData={getApartmentData}
                filterApi={apiGetFilterDistrictList}
                filterData={districtStaticDataFilter}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                defaultValue={queryFilter?.["districts"]}
                placeholder={i18n?.["site.district.title"]}
            />

            {
                typeCatalog !== 'residential_complex' &&
                <FilterResidence
                    i18n={i18n}
                    loading={loading}
                    filterType={"residence"}
                    clearSelect={clearSelects}
                    filterApiParams={queryApiFilters}
                    value={queryFilter?.["residence"]}
                    getApartmentData={getApartmentData}
                    assemblyFilter={setFilterQueryHandle}
                    filterApi={apiGetFilterResidenceList}
                    filterData={residenceStaticDataFilter}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.residence.title"]}
                />
            }

            <FilterRooms
                i18n={i18n}
                loading={loading}
                filterType={"rooms"}
                clearSelect={clearSelects}
                value={queryFilter?.["rooms"]}
                filterApiParams={queryApiFilters}
                filterApi={apiGetFilterRoomsList}
                filterData={roomsStaticDataFilter}
                getApartmentData={getApartmentData}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.roominess.title"]}
            />

            <FilterPropertyType
                i18n={i18n}
                loading={loading}
                clearSelect={clearSelects}
                filterType={"property_types"}
                filterApiParams={queryApiFilters}
                getApartmentData={getApartmentData}
                assemblyFilter={setFilterQueryHandle}
                value={queryFilter?.["property_types"]}
                assemblyFilterApi={setApiFiltersHandle}
                filterApi={apiGetFilterPropertyTypeList}
                filterData={propertyStaticTypeDataFilter}
                placeholder={i18n?.["site.property.type.title"]}
            />

            <FilterTags
                i18n={i18n}
                loading={loading}
                filterType={"tags"}
                clearSelect={clearSelects}
                value={queryFilter?.["tags"]}
                filterApi={apiGetFilterTagsList}
                filterData={tagStaticDataFilter}
                filterApiParams={queryApiFilters}
                getApartmentData={getApartmentData}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.tags.title"]}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                value={priceFrom}
                typeInput={'secondary'}
                onBlur={(e) => {
                    priceOnChangeDebounce(priceOnChangeHandle, 0, {
                        "data": priceFrom,
                        "name": "price.from",
                        "type": "$gte"
                    })
                }}
                onChange={(e) => {
                    setPriceFrom(e)
                    // setFilterQueryHandle({key: "price.from", value: e})
                    // setApiFiltersHandle({
                    //     key: "filters[apartments][price][$gte]",
                    //     value: e
                    // })
                }}
                placeholder={`${i18n?.["site.coast.from.title"]} ${getMinMaxPrices?.["min"]}`}
                disabled={getMinMaxPrices?.["min"] === getMinMaxPrices?.["max"] || Object.values(queryFilter || {}).length > 0 && queryFilter?.["districts"]}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                value={priceValue}
                typeInput={'secondary'}
                onBlur={(e) => {
                    priceOnChangeDebounce(priceOnChangeHandle, 0, {
                        "data": priceValue,
                        "name": "price.to",
                        "type": "$lte"
                    })
                }}
                onChange={(e) => {
                    setPriceValue(e)
                    // priceOnChangeDebounce(priceOnChangeHandle, 500, {"data": e, "name": "price.to", "type": "$lte"})
                    // setFilterQueryHandle({key: "price.to", value: e})
                    // setApiFiltersHandle({
                    //     key: "filters[apartments][price][$lte]",
                    //     value: e
                    // })
                }}
                placeholder={`${i18n?.["site.coast.to.title"]} ${getMinMaxPrices?.["max"]}`}
                disabled={getMinMaxPrices?.["max"] === getMinMaxPrices?.["min"]}
            />
        </>
    );
}

export default FilterList;
