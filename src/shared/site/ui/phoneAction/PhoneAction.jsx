import React from 'react';
import {PhoneLink} from "@/shared/uikit/links";
import styles from "@/styles/site-component.module.sass";
import {SwitchLocalization} from "@/widgets/switch/localication";

/**
 * @author Zholaman Zhumanov
 * @created 20.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PhoneAction(props) {
    const {type, hideContent, i18n, themePhone, themeLocal, phoneOnClick, localOnClick} = props

    return (
        <div className={`${styles['site_phone_box']} ${hideContent ? styles['phone_box_hide'] : ''}`}>
            <div className={styles['phone_link']}>
                <PhoneLink i18n={i18n} theme={themePhone} type={type} hideContent={hideContent} onClick={phoneOnClick}/>
            </div>
            <div className={styles['localization_link']}>
                <SwitchLocalization i18n={i18n} theme={themeLocal} hideContent={hideContent} onClick={localOnClick}/>
            </div>
        </div>
    );
}

export default PhoneAction;
