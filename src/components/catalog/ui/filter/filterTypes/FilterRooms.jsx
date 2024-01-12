import React from 'react';
import FilterBox from "@/components/catalog/ui/filter/FilterBox";

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
        loading,
        disabled,
        filterApi,
        filterData,
        filterType,
        placeholder,
        onClickDis,
        clearSelect,
        assemblyFilter,
        filterApiParams,
        getApartmentData,
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
            onClickDis={onClickDis}
            filterType={filterType}
            placeholder={placeholder}
            clearSelect={clearSelect}
            filterGetData={filterData}
            assemblyFilter={assemblyFilter}
            filterApiParams={filterApiParams}
            getApartmentData={getApartmentData}
            onClickContainer={onClickContainer}
            assemblyFilterApi={assemblyFilterApi}
        />
    );
}

export default FilterRooms;
