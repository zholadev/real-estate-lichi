import React, {useEffect, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";
import {apiGetFilterResidenceList} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterResidence(props) {
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

    const [residenceDataFilter, setResidenceFilterData] = useState([])

    const getFilterData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [filterApiParams], false, {
            onGetData: (params) => {
                setResidenceFilterData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterData()
            .catch(error => {
                errorHandler("filterResidence", "useEffect", error)
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
            filterGetData={residenceDataFilter}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterResidence;
