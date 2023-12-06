'use client'

import React, {useCallback, useEffect, useState} from 'react';
import styles from "@/styles/ui-tabs.module.sass";
import {MotionTextUnderLine} from "@/shared/uikit/motion";
import {useRouter} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Tabs(props) {
    const {i18n, onClick, tabData, item, activeSelectName, defaultValue, url} = props

    const router = useRouter()

    const [tab, setTab] = useState(defaultValue || "")

    const toggleTab = useCallback((value) => {
        try {
            setTab(value)
            if (onClick) {
                onClick(value)
            }

            if (url) {
                router.replace(url)
            }
        } catch (error) {
            console.log(`page: catalog, event: toggleTab, error: ${error}`)
        }
    }, [tab, onClick])

    useEffect(() => {
        if (Object.values(tabData || {}).length === 0) return
        if (!tab) {
            setTab(Object.values(tabData || {})?.[0]?.["name"])
            onClick(Object.values(tabData || {})?.[0]?.["name"])
        }
    }, [tab]);

    if (Object.values(tabData || {}).length === 0) {
        return null
    }

    return (
        <div className={styles['ui_tabs']}>
            {
                Object.values(tabData || {}).map((tabItem, id) => {
                    return (
                        <button
                            onClick={() => {
                                toggleTab(tabItem?.[activeSelectName])
                            }}
                            tabIndex={id}
                            key={id}
                        >
                            <span>
                                {tabItem?.[item]}
                                <MotionTextUnderLine
                                    current={tab}
                                    id={tabItem?.[activeSelectName]}
                                />
                            </span>
                        </button>
                    )
                })
            }
        </div>
    );
}

export default Tabs;
