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
                    setDistrictDataFilter(params.api_data)
                }
            })
    }

    useEffect(() => {
        getFilterDistrictData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [queryApiFilters]);

    /**
     * @description Residence Data
     * @returns {Promise<void>}
     */
    const getFilterResidenceData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [queryApiFilters], false, {
            onGetData: (params) => {
                setResidenceFilterData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterResidenceData()
            .catch(error => {
                errorHandler("filterResidence", "useEffect", error)
            })
    }, [queryApiFilters]);

    /**
     * @description Rooms Data
     * @returns {Promise<void>}
     */
    const getFilterRoomsData = async () => {
        await apiFetchHandler(apiGetFilterRoomsList, [queryApiFilters], false, {
            onGetData: (params) => {
                setRoomsDataFilter(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterRoomsData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [queryApiFilters]);

    /**
     * @description Property Type Data
     * @returns {Promise<void>}
     */
    const getFilterPropertyData = async () => {
        await apiFetchHandler(apiGetFilterPropertyTypeList, [queryApiFilters], false, {
            onGetData: (params) => {
                setPropertyTypeFilterData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterPropertyData()
            .catch(error => {
                errorHandler("filterPropertyType", "useEffect", error)
            })
    }, [queryApiFilters]);

    /**
     * @description Tags Data
     * @returns {Promise<void>}
     */
    const getFilterTagsData = async () => {
        await apiFetchHandler(apiGetFilterTagsList, [queryApiFilters], false, {
            onGetData: (params) => {
                setTagDataFilter(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterTagsData()
            .catch(error => {
                errorHandler("filterTags", "useEffect", error)
            })
    }, [queryApiFilters]);

    useEffect(() => {
        try {
            setFilterAllData([...districtDataFilter, ...roomsDataFilter, ...tagDataFilter, ...residenceDataFilter, ...propertyTypeDataFilter])
        } catch (error) {
            errorHandler("filterList", "set filters all data", error)
        }
    }, [districtDataFilter, roomsDataFilter, tagDataFilter, residenceDataFilter, propertyTypeDataFilter]);

    return (
        <>
            <FilterDistrict
                i18n={i18n}
                loading={loading}
                filterType={"districts"}
                clearSelect={clearSelects}
                clearFilters={clearFilters}
                filterData={districtDataFilter}
                value={queryFilter?.["districts"]}
                filterApi={apiGetFilterDistrictList}
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
                    filterData={residenceDataFilter}
                    value={queryFilter?.["residence"]}
                    clearSelect={clearSelects}
                    filterApi={apiGetFilterResidenceList}
                    assemblyFilter={setFilterQueryHandle}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.residence.title"]}
                    filterApiParams={queryApiFilters}
                />
            }

            <FilterRooms
                i18n={i18n}
                loading={loading}
                filterType={"rooms"}
                clearSelect={clearSelects}
                filterData={roomsDataFilter}
                value={queryFilter?.["rooms"]}
                filterApiParams={queryApiFilters}
                filterApi={apiGetFilterRoomsList}
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
                filterData={propertyTypeDataFilter}
                assemblyFilter={setFilterQueryHandle}
                value={queryFilter?.["property_types"]}
                assemblyFilterApi={setApiFiltersHandle}
                filterApi={apiGetFilterPropertyTypeList}
                placeholder={i18n?.["site.property.type.title"]}
            />

            <FilterTags
                i18n={i18n}
                loading={loading}
                filterType={"tags"}
                filterData={tagDataFilter}
                clearSelect={clearSelects}
                value={queryFilter?.["tags"]}
                filterApi={apiGetFilterTagsList}
                filterApiParams={queryApiFilters}
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
                onChange={(e) => {
                    setPriceFrom(e)
                    setFilterQueryHandle({key: "price.from", value: e})
                    setApiFiltersHandle({
                        key: "filters[apartments][price][$gte]",
                        value: e
                    })
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
                onChange={(e) => {
                    setPriceValue(e)
                    setFilterQueryHandle(e)
                    setFilterQueryHandle({key: "price.to", value: e})
                    setApiFiltersHandle({
                        key: "filters[apartments][price][$lte]",
                        value: e
                    })
                }}
                placeholder={`${i18n?.["site.coast.to.title"]} ${getMinMaxPrices?.["max"]}`}
                disabled={getMinMaxPrices?.["max"] === getMinMaxPrices?.["min"]}
            />
        </>
    );
}

export default FilterList;
