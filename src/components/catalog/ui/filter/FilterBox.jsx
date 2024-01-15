import React, {useMemo} from 'react';
import {FormSelect} from "@/shared/uikit/form/select";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import useFilterGetKey from "@/components/catalog/lib/useFilterGetKey";

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
        clearFilters,
        filterGetData,
        assemblyFilter,
        filterSendClick,
        onClickContainer,
        assemblyFilterApi,
    } = props

    const filterGetCurrentKey = useFilterGetKey()

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

    const currentValue = options?.filter((item) => {
        if (Array.isArray(value)) {
            return value.some((valueItem) => {
                return item.value === valueItem
            })
        } else {
            return item.value === value
        }
    })

    return (
        <FormSelect
            isMulti={false}
            i18n={i18n}
            id={filterType}
            loader={loading}
            name={filterType}
            options={options}
            clear={clearSelect}
            value={currentValue}
            placeholder={placeholder}
            onClickContainer={onClickContainer}
            disabled={disabled || options?.length === 0}
            onChange={e => {
                if (e) {
                    assemblyFilter(e, filterSendClick)
                    assemblyFilterApi({
                        key: filterGetCurrentKey(filterType),
                        value: e?.value
                    })
                }
            }}
        />
    );
}

export default FilterBox;
