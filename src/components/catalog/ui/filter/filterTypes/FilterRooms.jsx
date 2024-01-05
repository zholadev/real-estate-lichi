import React, {useEffect, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";
import {apiGetFilterRoomsList} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterRooms(props) {
    const {
        i18n,
        value,
        disabled,
        filterApi,
        filterType,
        placeholder,
        clearSelect,
        assemblyFilter,
        filterApiParams,
        onClickContainer,
        assemblyFilterApi,
        onClickDis
    } = props

    const {apiFetchHandler, loading} = useApiRequest()
    const [roomsDataFilter, setRoomsDataFilter] = useState([])

    const getFilterData = async () => {
        await apiFetchHandler(apiGetFilterRoomsList, [filterApiParams], false, {
            onGetData: (params) => {
                setRoomsDataFilter(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterData()
            .catch(error => {
                errorHandler("filterDistrict", "useEffect", error)
            })
    }, [filterApiParams]);


    return (
        <FilterBox
            i18n={i18n}
            value={value}
            loading={loading}
            disabled={disabled}
            filterApi={filterApi}
            onClickDis={onClickDis}
            filterType={filterType}
            placeholder={placeholder}
            clearSelect={clearSelect}
            filterGetData={roomsDataFilter}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterRooms;
