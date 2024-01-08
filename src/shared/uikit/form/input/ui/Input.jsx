'use client'

import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/styles/ui-form-input.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Input(props) {
    const {value, onClick, onChange, label, placeholder, id, name, type, typeInput, labelActive, disabled} = props

    const [labelTrigger, setLabelTrigger] = useState(false)

    const toggleLabelTriggerHandle = useCallback(() => {
        if (value?.length > 0 || labelActive) return
        setLabelTrigger(!labelTrigger)
    }, [labelTrigger, value, labelActive])

    useEffect(() => {
        if (value?.length > 0 || labelActive) {
            setLabelTrigger(true)
        }
    }, [value, labelActive]);

    const onChangeHandler = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const onBlurHandler = () => toggleLabelTriggerHandle()
    const onFocusHandler = () => toggleLabelTriggerHandle()

    return (
        <div className={`${styles['ui_input']} ${typeInput === 'secondary' ? styles['ui_input_sc'] : ""}`}>
            <label
                htmlFor={id}
                className={`${styles['label']} ${labelTrigger ? styles['label_trigger_active'] : ''}`}>
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
