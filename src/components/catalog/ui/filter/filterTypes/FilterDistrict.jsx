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
        loading,
        disabled,
        filterApi,
        filterType,
        placeholder,
        filterData,
        clearSelect,
        clearFilters,
        assemblyFilter,
        filterSendClick,
        filterApiParams,
        onClickContainer,
        assemblyFilterApi,
    } = props

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
            filterGetData={filterData}
            clearFilters={clearFilters}
            assemblyFilter={assemblyFilter}
            filterSendClick={filterSendClick}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterDistrict;
