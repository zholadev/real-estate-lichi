

import React from 'react';
import Link from "next/link";
import styles from "@/styles/navbar.module.sass";

// TODO: styles updated

/**
 * @author Zholaman Zhumanov
 * @created 17.10.2023
 * @todo refactoring and styles file changed
 * @param props
 * @returns {Element}
 * @constructor
 */
function PhoneLink(props) {
    const {i18n, theme, type, hideContent} = props

    return (
        <Link href={'tel:+971588695492'}>
            <div className={`${styles['navbar_phone']} ${hideContent ? styles['phone_hide_content'] : ''} ${type === 'secondary' ? styles['navbar_phone_secondary'] : ''} ${theme === 'light' ? styles['navbar_phone__light'] : ''}`}>
                <i className={styles['phone_icon']}/>
                <span>{i18n?.["site"]?.["site_number_phone"]}</span>
            </div>
        </Link>
    );
}

export default PhoneLink;
