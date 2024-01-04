import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useApiRequest, useToastMessage} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";

/**
 * @author Zholaman Zhumanov
 * @created 14.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterContent(props) {
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
    } = props

    const {apiFetchHandler, loading} = useApiRequest()

    const toastMessage = useToastMessage()

    const [tagDataFilter, setTagDataFilter] = useState([])
    const [roomsDataFilter, setRoomsDataFilter] = useState([])
    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])

    const filterTypes = useMemo(() => {
        return [
            "districts",
            "residence",
            "rooms",
            "property_types",
            "tags"
        ]
    }, [])

    const filterGetData = () => {
        if (filterTypes.includes(filterType)) {
          if (filterType === 'rooms') {
                return roomsDataFilter
            } else if (filterType === 'property_types') {
                return propertyTypeDataFilter
            } else if (filterType === 'tags') {
                return tagDataFilter
            } else {
                return toastMessage("filter is empty", "error")
            }
        } else {
            return toastMessage("filter is not access", "error")
        }
    }

    const getFilterData = async () => {
        await apiFetchHandler(filterApi, [filterApiParams], false, {
            onGetData: (params) => {
               if (filterType === 'rooms') {
                    setRoomsDataFilter(params.api_data)
                } else if (filterType === 'property_types') {
                    setPropertyTypeFilterData(params.api_data)
                } else if (filterType === 'tags') {
                    setTagDataFilter(params.api_data)
                } else {
                    return toastMessage("filter type is not available", "error")
                }
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
            filterType={filterType}
            placeholder={placeholder}
            clearSelect={clearSelect}
            filterGetData={filterGetData}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default React.memo(FilterContent);
