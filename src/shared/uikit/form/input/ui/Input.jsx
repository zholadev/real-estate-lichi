'use client'

import React, {useCallback, useState} from 'react';
import styles from '@/styles/ui-form-input.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Input(props) {
    const {value, onClick, onChange, label, placeholder, id, name, type} = props

    const [labelTrigger, setLabelTrigger] = useState(false)

    const toggleLabelTriggerHandle = useCallback(() => {
        setLabelTrigger(!labelTrigger)
    }, [labelTrigger])

    const onChangeHandler = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const onBlurHandler = () => {
        toggleLabelTriggerHandle()
    }

    const onFocusHandler = () => {
        toggleLabelTriggerHandle()
    }

    return (
        <div className={styles['ui_input']}>
            <label htmlFor={id} className={`${styles['label']} ${labelTrigger ? styles['label_trigger_active'] : ''}`}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value ?? ""}
                onClick={onClick}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={e => onChangeHandler(e)}
                placeholder={placeholder}
                className={styles['input']}
            />
        </div>
    );
}

export default Input;
