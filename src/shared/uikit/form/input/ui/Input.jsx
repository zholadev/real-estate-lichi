

import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/styles/ui-form-input.module.sass'
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Input(props) {
    const {value, onClick, onChange, label, placeholder, id, name, type, typeInput, disabled, onBlur, onFocus} = props

    const onChangeHandler = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const onBlurHandler = () => {
        try {
            if (onBlur) onBlur()
        } catch (error) {
            errorHandler("input", "onBlurHandler", error)
        }
    }
    const onFocusHandler = () => {
        try {
            if (onFocus) onFocus()
        } catch (error) {
            errorHandler("input", "onFocusHandler", error)
        }
    }

    return (
        <div className={`${styles['ui_input']} ${typeInput === 'secondary' ? styles['ui_input_sc'] : ""}`}>
            <label
                htmlFor={id}
                className={`${styles['label']}`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value ?? ""}
                onClick={onClick}
                disabled={disabled}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={e => onChangeHandler(e)}
                placeholder={placeholder}
                className={`${styles['input']} ${disabled ? 'cursor-disabled' : ''}`}
            />
        </div>
    );
}

export default Input;
