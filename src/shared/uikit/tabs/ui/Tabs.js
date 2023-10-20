'use client'

import React, {useCallback, useState} from 'react';
import styles from "@/styles/ui-tabs.module.sass";
import {MotionTextUnderLine} from "@/shared/uikit/motion";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Tabs(props) {
    const {i18n, onClick, tabData} = props

    const [tab, setTab] = useState(tabData?.[0]?.["value"])

    const toggleTab = useCallback((value) => {
        try {
            setTab(value)
            if (onClick) {
                onClick(value)
            }
        } catch (error) {
            console.log(`page: catalog, event: toggleTab, error: ${error}`)
        }
    }, [tab, onClick])

    return (
        <div className={styles['ui_tabs']}>
            {
                tabData.map((tabItem, id) => {
                    return (
                        <button
                            onClick={() => {
                                toggleTab(tabItem?.["value"])
                            }}
                            tabIndex={id}
                            key={id}
                        >
                            <span>
                                {tabItem?.["title"]}
                                <MotionTextUnderLine
                                    current={tab}
                                    id={tabItem?.["value"]}
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
