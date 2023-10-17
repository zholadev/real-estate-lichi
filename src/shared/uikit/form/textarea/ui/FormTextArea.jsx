import React from 'react';
import styles from '@/styles/ui-form-textarea.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FormTextArea(props) {
    const {label, onChange, onBlur, onFocus, name, id, col = 1, rows = 1} = props

    return (
        <div className={styles['ui_textarea']}>
            <label htmlFor={id}>{label}</label>
            <textarea name={name} id={id} cols={col} rows={rows} className={styles['textarea']}></textarea>
        </div>
    );
}

export default FormTextArea;
