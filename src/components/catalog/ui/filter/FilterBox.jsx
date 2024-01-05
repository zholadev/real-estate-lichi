import React, {useMemo} from 'react';
import {FormSelect} from "@/shared/uikit/form/select";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterBox(props) {
    const {
        i18n,
        value,
        loading,
        disabled,
        filterType,
        placeholder,
        clearSelect,
        assemblyFilter,
        onClickContainer,
        assemblyFilterApi,
        filterGetData,
    } = props

    const options = useMemo(() => {
        try {
            if (filterType === 'residence') {
                return filterGetData.map((filter) => {
                    return {
                        label: filter?.["attributes"]?.["name"],
                        value: filter?.["attributes"]?.["name"],
                        key: filterType
                    }
                })
            }
            return filterGetData.map((filter) => {
                return {
                    label: filter?.["attributes"]?.["name"],
                    value: filter?.["attributes"]?.["type"],
                    key: filterType
                }
            })
        } catch (error) {
            errorHandler("filterSelectContent", "options", error)
        }
    }, [filterGetData])

    const getFilterKeyQuery = useMemo(() => {
        try {
            let key = `filters[apartments][${filterType}][type]`

            if (filterType === 'residence') {
                key = `filters[apartments][residence][name][$contains]`
            }

            return key
        } catch (error) {
            errorHandler("filterSelectContent", "getFilterKeyQuery", error)
        }
    }, [filterType])

    const currentValue = options?.filter((item) => item.value === value)

    return (
        <FormSelect
            i18n={i18n}
            id={filterType}
            loader={loading}
            name={filterType}
            options={options}
            disabled={disabled || options?.length === 0}
            clear={clearSelect}
            value={currentValue}
            placeholder={placeholder}
            onClickContainer={onClickContainer}
            onChange={e => {
                if (e) {
                    assemblyFilter(e)
                    assemblyFilterApi({
                        key: getFilterKeyQuery,
                        value: e?.value
                    })
                }
            }}
        />
    );
}

export default FilterBox;
