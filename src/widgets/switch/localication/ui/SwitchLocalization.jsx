'use client'

import React, {useCallback, useState} from 'react';
import styles from "@/styles/widget-switch-local.module.sass";
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function SwitchLocalization(props) {
    const {theme, hideContent} = props

    const [lang, setLang] = useState('ru')

    const mediaMdQuery = useMediaMaxState({screenSize: 768})

    const toggleLangHandle = useCallback(() => {
        const getCurrentLangValue = lang === 'ru' ? 'en' : 'ru'
        setLang(getCurrentLangValue)
    }, [lang])

    return (
        hideContent && mediaMdQuery ? null :
            <div
                className={`${styles['switch_lang_toggle']} ${theme === 'light' ? styles['switch_lang_toggle__light'] : ''}`}>
                <div className={`${styles['lang']} ${lang === 'ru' ? styles['lang_active'] : ''}`}
                     onClick={toggleLangHandle}>ru
                </div>
                <div className={styles['lang']}>/</div>
                <div className={`${styles['lang']} ${lang === 'en' ? styles['lang_active'] : ''}`}
                     onClick={toggleLangHandle}>en
                </div>
            </div>
    );
}

export default SwitchLocalization;
