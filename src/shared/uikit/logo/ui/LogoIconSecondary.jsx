import React from 'react';
import styles from "@/styles/ui-logo.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 16.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function LogoIconSecondary(props) {
    const {onClick} = props

    return (
        <div className={`${styles['icon_box']} ${styles['icon_box_row']}`} onClick={onClick}>
            <svg
                width="5"
                height="22"
                viewBox="0 0 5 22"
                fill="none"
                style={{marginRight: '6px'}}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.12275e-06 5.50904L0 19.5002V22.0002H5L5 19.5002L5 0.587891L2.12275e-06 5.50904Z"
                    fill="#16181D"
                />
            </svg>

            <svg
                width="5"
                height="34"
                viewBox="0 0 5 34"
                fill="none"
                style={{marginRight: '6px'}}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.73847e-06 0.510254L0 31.4998V33.9998H5V31.4998L5 5.66824L5 5.66824L1.73847e-06 0.510254Z"
                    fill="#16181D"
                />
            </svg>

            <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.61632V14.5V17H5V14.5L5 0.522461L0 5.61632Z" fill="#16181D"/>
            </svg>
        </div>
    );
}

export default LogoIconSecondary;
