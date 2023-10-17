'use client'

import React from 'react';
import Select from "react-select";
import {ICON} from "@/shared/constants/constants";
import {customSelectDefaultStyles} from "../model/selectStyles";
import styles from '@/styles/ui-form-select.module.sass'

function FormSelect(props) {
    const {label, options, id, name, loader, search, placeholder = 'Выбрать', i18n, type} = props

    return (
        <div className={styles['ui_select']}>
            {label && <label htmlFor={id} className={styles['label']}>{label}</label>}

            <Select
                id={id}
                name={name}
                styles={customSelectDefaultStyles(type)}
                placeholder={placeholder}
                noOptionsMessage={() => i18n?.["form"]?.["empty"]}
                options={options}
                isLoading={loader}
                isSearchable={search}
                components={{
                    DropdownIndicator: () => <img src={ICON.arrowBottomIcon['src']} alt="" style={{width: type === 'secondary' ? '14px' : 'initial'}}/>,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                    LoadingIndicator: () => null
                }}
            />
        </div>
    );
}

export default FormSelect;
