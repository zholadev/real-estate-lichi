import React, {useEffect, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {apiGetFilterDistrictList} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterDistrict(props) {
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

    const [districtDataFilter, setDistrictDataFilter] = useState([])

    const getFilterData = async () => {
        await apiFetchHandler(apiGetFilterDistrictList, [filterApiParams], false, {
            onGetData: (params) => {
                setDistrictDataFilter(params.api_data)
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
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            filterGetData={districtDataFilter}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterDistrict;
