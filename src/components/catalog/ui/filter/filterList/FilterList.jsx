import React, {useEffect} from 'react';
import {
    apiGetFilterDistrictList,
    apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList,
    apiGetFilterTagsList
} from "@/shared/services/clientRequests";
import {Input} from "@/shared/uikit/form/input";
import FilterTags from "../filterTypes/FilterTags";
import FilterRooms from "../filterTypes/FilterRooms";
import FilterDistrict from "../filterTypes/FilterDistrict";
import useDebounce from "@/shared/hooks/model/useDebounce";
import {useAppSelector} from "@/entities/store/hooks/hooks";
import FilterResidence from "../filterTypes/FilterResidence";
import useGetMinMaxPrice from "../../../lib/useGetMinMaxPrice";
import {useApiRequest, useDispatchHandler} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
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
        clearSelects,
        setApiFiltersHandle,
        setFilterQueryHandle,
    } = props

    const app = useDispatchHandler()

    const getMinMaxPrices = useGetMinMaxPrice()

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        catalogType
    } = useAppSelector(state => state?.catalog)

    const {
        filterCtgPriceFrom,
        filterCtgPriceValue,
        filterCtgQueriesData,
    } = useAppSelector(state => state?.filterCatalog)

    const {
        filterTagStaticData,
        filterRoomsStaticData,
        filterDistrictStaticData,
        filterResidenceStaticData,
        filterPropertyTypeStaticData,
    } = useAppSelector(state => state?.filterData)

    /**
     * @description Districts Data
     * @returns {Promise<void>}
     */
    const getFilterDistrictData = async () => {
        await apiFetchHandler(
            apiGetFilterDistrictList,
            [filterCtgQueriesData],
            false,
            {
                onGetData: (params) => {
                    if (filterDistrictStaticData.length === 0) {
                        app.filterDistrictStaticDataAction(params.api_data)
                    }
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
            [filterCtgQueriesData],
            false,
            {
                onGetData: (params) => {
                    if (filterResidenceStaticData.length === 0) {
                        app.filterResidenceStaticDataAction(params.api_data)
                    }
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
            [filterCtgQueriesData],
            false,
            {
                onGetData: (params) => {
                    if (filterRoomsStaticData.length === 0) {
                        app.filterRoomsStaticDataAction(params.api_data)
                    }
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
            [filterCtgQueriesData],
            false,
            {
                onGetData: (params) => {
                    if (filterPropertyTypeStaticData.length === 0) {
                        app.filterPropertyTypeStaticDataAction(params.api_data)
                    }
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
            [filterCtgQueriesData],
            false,
            {
                onGetData: (params) => {
                    if (filterTagStaticData.length === 0) {
                        app.filterTagStaticDataAction(params.api_data)
                    }
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
    }, []);

    useEffect(() => {
        try {
            app.filterCtgAllDataAction([...filterDistrictStaticData, ...filterRoomsStaticData, ...filterTagStaticData, ...filterResidenceStaticData, ...filterPropertyTypeStaticData])
        } catch (error) {
            errorHandler("filterList", "set filters all data", error)
        }
    }, [
        filterDistrictStaticData,
        filterRoomsStaticData,
        filterTagStaticData,
        filterResidenceStaticData,
        filterPropertyTypeStaticData
    ]);

    return (
        <>
            <FilterDistrict
                i18n={i18n}
                loading={loading}
                filterType={"districts"}
                clearSelect={clearSelects}
                filterApi={apiGetFilterDistrictList}
                filterData={filterDistrictStaticData}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                value={filterCtgQueriesData?.["districts"]}
                placeholder={i18n?.["site.district.title"]}
                defaultValue={filterCtgQueriesData?.["districts"]}
            />

            {
                catalogType !== 'residential_complex' &&
                <FilterResidence
                    i18n={i18n}
                    loading={loading}
                    filterType={"residence"}
                    clearSelect={clearSelects}
                    filterApiParams={filterCtgQueriesData}
                    value={filterCtgQueriesData?.["residence"]}
                    assemblyFilter={setFilterQueryHandle}
                    filterApi={apiGetFilterResidenceList}
                    filterData={filterResidenceStaticData}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.residence.title"]}
                />
            }

            <FilterRooms
                i18n={i18n}
                loading={loading}
                filterType={"rooms"}
                clearSelect={clearSelects}
                filterApi={apiGetFilterRoomsList}
                filterData={filterRoomsStaticData}
                assemblyFilter={setFilterQueryHandle}
                filterApiParams={filterCtgQueriesData}
                assemblyFilterApi={setApiFiltersHandle}
                value={filterCtgQueriesData?.["rooms"]}
                placeholder={i18n?.["site.roominess.title"]}
            />

            <FilterPropertyType
                i18n={i18n}
                loading={loading}
                clearSelect={clearSelects}
                filterType={"property_types"}
                assemblyFilter={setFilterQueryHandle}
                filterApiParams={filterCtgQueriesData}
                assemblyFilterApi={setApiFiltersHandle}
                filterApi={apiGetFilterPropertyTypeList}
                filterData={filterPropertyTypeStaticData}
                value={filterCtgQueriesData?.["property_types"]}
                placeholder={i18n?.["site.property.type.title"]}
            />

            <FilterTags
                i18n={i18n}
                loading={loading}
                filterType={"tags"}
                clearSelect={clearSelects}
                value={filterCtgQueriesData?.["tags"]}
                filterApi={apiGetFilterTagsList}
                filterData={filterTagStaticData}
                filterApiParams={filterCtgQueriesData}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.tags.title"]}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                value={filterCtgPriceFrom}
                typeInput={'secondary'}
                onBlur={(e) => {
                    priceOnChangeDebounce(priceOnChangeHandle, 0, {
                        "data": filterCtgPriceFrom,
                        "name": "price.from",
                        "type": "$gte"
                    })
                }}
                onChange={(e) => app.filterCtgPriceFromAction(e)}
                placeholder={`${i18n?.["site.coast.from.title"]} ${getMinMaxPrices?.["min"]}`}
                disabled={getMinMaxPrices?.["min"] === getMinMaxPrices?.["max"] || Object.values(filterCtgQueriesData || {}).length > 0 && filterCtgQueriesData?.["districts"]}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                value={filterCtgPriceValue}
                typeInput={'secondary'}
                onBlur={(e) => {
                    priceOnChangeDebounce(priceOnChangeHandle, 0, {
                        "data": filterCtgPriceValue,
                        "name": "price.to",
                        "type": "$lte"
                    })
                }}
                onChange={(e) => app.filterCtgPriceValueAction(e)}
                placeholder={`${i18n?.["site.coast.to.title"]} ${getMinMaxPrices?.["max"]}`}
                disabled={getMinMaxPrices?.["max"] === getMinMaxPrices?.["min"]}
            />
        </>
    );
}

export default FilterList;
