

import React from 'react';
import styles from "@/styles/ui-logo.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 16.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function LogoIconPrimary(props) {
    const {refContainer, refIcon1, refIcon2, refIcon3, refIconPath1, refIconPath2, refIconPath3, onClick} = props

    return (
        <div ref={refContainer} className={`${styles['icon_box']} icon`} onClick={onClick}>
            <svg
                ref={refIcon1}
                width="24"
                height="2"
                viewBox="0 0 24 2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1 1L23 1" stroke="#16181D" strokeWidth={2} ref={refIconPath1}/>
            </svg>

            <svg
                ref={refIcon2}
                width="36"
                height="2"
                viewBox="0 0 36 2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1 1H35" stroke="#16181D" strokeWidth={2} ref={refIconPath2}/>
            </svg>

            <svg
                ref={refIcon3}
                width="24"
                height="2"
                viewBox="0 0 24 2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1 1L23 1" stroke="#16181D" strokeWidth={2} ref={refIconPath3}/>
            </svg>
        </div>
    );
}

export default LogoIconPrimary;
