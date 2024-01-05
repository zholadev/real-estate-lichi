'use client'

import React, {useCallback, useEffect, useRef} from 'react';
import Select from "react-select";
import {ICON} from "@/shared/constants/constants";
import styles from '@/styles/ui-form-select.module.sass'
import {customSelectDefaultStyles} from "../model/selectStyles";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function FormSelect(props) {
    const {
        label,
        options,
        id,
        name,
        loader,
        search,
        placeholder,
        i18n,
        type,
        onChange,
        isMulti,
        clear,
        value,
        onClick,
        disabled,
        onClickContainer
    } = props

    const selectInputRef = useRef(null);

    const onClickHandle = useCallback(() => {
        try {
            if (onClick) onClick()
        } catch (error) {
            errorHandler("formSelect", "onClickHandle", error)
        }
    }, [onClick])

    const onClickContainerHandle = useCallback(() => {
        try {
            if (onClickContainer) onClickContainer()
        } catch (error) {
            errorHandler("formSelect", "onClickContainerHandle", error)
        }
    }, [onClickContainer])

    const onClearHandle = useCallback(() => {
        try {
            if (selectInputRef.current) {
                selectInputRef.current?.clearValue();
            }
        } catch (error) {
            errorHandler("formSelect", "onClear", error)
        }
    }, [selectInputRef])

    useEffect(() => {
        if (clear === 'clear') {
            onClearHandle()
        }
    }, [clear]);

    return (
        <div className={styles['ui_select']} onClick={onClickContainerHandle}>
            {label && <label htmlFor={id} className={styles['label']}>{label}</label>}

            <Select
                name={name}
                instanceId={id}
                value={value}
                ref={selectInputRef}
                styles={customSelectDefaultStyles(type)}
                placeholder={placeholder || i18n?.["form.selected.title"]}
                noOptionsMessage={() => i18n?.["form"]?.["empty"]}
                options={options}
                isLoading={loader}
                isDisabled={disabled || loader}
                isMulti={isMulti}
                onClick={onClickHandle}
                defaultValue={options?.[0]}
                onChange={e => {
                    if (onChange) {
                        onChange(e)
                    }
                }}
                isSearchable={search}
                components={{
                    DropdownIndicator: () => <img src={ICON.arrowBottomIcon['src']} alt=""
                                                  style={{width: type === 'secondary' ? '14px' : 'initial'}}/>,
                    IndicatorSeparator: () => null
                }}
            />
        </div>
    );
}

export default FormSelect;
