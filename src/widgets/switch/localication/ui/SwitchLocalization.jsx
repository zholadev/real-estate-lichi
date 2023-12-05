'use client'

import React, {useCallback, useEffect, useState} from 'react';
import styles from "@/styles/widget-switch-local.module.sass";
import {useMediaMaxState} from "@/shared/hooks";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function SwitchLocalization(props) {
    const {theme, hideContent} = props

    const router = useRouter()

    const langCookie = Cookies.get('dubai_lang')

    const [lang, setLang] = useState('ru')

    const mediaMdQuery = useMediaMaxState({screenSize: 768})

    const toggleLangHandle = useCallback(() => {
        const getCurrentLangValue = lang === 'ru' ? 'en' : 'ru'
        Cookies.set('dubai_lang', getCurrentLangValue, {expires: 7})
        setLang(getCurrentLangValue)
    }, [lang])

    useEffect(() => {
        setLang(langCookie)
    }, [langCookie]);

    return (
        hideContent && mediaMdQuery ? null :
            <div
                className={`${styles['switch_lang_toggle']} ${theme === 'light' ? styles['switch_lang_toggle__light'] : ''}`}>
                <a
                    href={'/ru'}
                    className={`${styles['lang']} ${lang === 'ru' ? styles['lang_active'] : ''}`}
                    onClick={toggleLangHandle}
                >
                    ru
                </a>
                <div className={`${styles['lang']} ${styles['slash']}`}>/</div>
                <a
                    href={'/en'}
                    className={`${styles['lang']} ${lang === 'en' ? styles['lang_active'] : ''} ${styles['last']}`}
                    onClick={toggleLangHandle}
                >
                    en
                </a>
            </div>
    );
}

export default SwitchLocalization;
