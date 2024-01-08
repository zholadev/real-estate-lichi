import React, {useEffect, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import FilterBox from "@/components/catalog/ui/filter/FilterBox";
import {apiGetFilterTagsList} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterTags(props) {
    const {
        i18n,
        value,
        loading,
        disabled,
        filterType,
        filterData,
        placeholder,
        clearSelect,
        assemblyFilter,
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
            filterType={filterType}
            placeholder={placeholder}
            clearSelect={clearSelect}
            filterGetData={filterData}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterTags;
