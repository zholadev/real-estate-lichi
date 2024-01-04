import React, {useEffect, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";
import {apiGetFilterPropertyTypeList} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterPropertyType(props) {
    const {
        i18n,
        value,
        disabled,
        filterType,
        placeholder,
        clearSelect,
        assemblyFilter,
        filterApiParams,
        onClickContainer,
        assemblyFilterApi,
    } = props

    const {apiFetchHandler, loading} = useApiRequest()

    const [propertyTypeDataFilter, setPropertyTypeFilterData] = useState([])

    const getFilterData = async () => {
        await apiFetchHandler(apiGetFilterPropertyTypeList, [filterApiParams], false, {
            onGetData: (params) => {
                setPropertyTypeFilterData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterData()
            .catch(error => {
                errorHandler("filterPropertyType", "useEffect", error)
            })
    }, [filterApiParams]);


    return (
        <FilterBox
            i18n={i18n}
            value={value}
            loading={loading}
            disabled={disabled}
            filterType={filterType}
            placeholder={placeholder}
            clearSelect={clearSelect}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
            filterGetData={propertyTypeDataFilter}
        />
    );
}

export default FilterPropertyType;
