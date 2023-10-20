'use client'

import React, {useState} from 'react';
import AccordionItem from "./AccordionItem";
import styles from '@/styles/ui-accordion.module.sass'
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Accordion(props) {
    const {data, contentTab, isSingle, openAll} = props

    const mediaMdQuery = useMediaMaxState({screenSize: 768})

    const [selectItem, setSelectItem] = useState(contentTab ? [0] : [])

    const selectTriggerHandle = (index) => {
        try {
            if (!isSingle) {
                setSelectItem(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
            } else {
                setSelectItem(prev => prev.includes(index) ? [] : [index])
            }
        } catch (error) {
            console.log(`page: accordion, event: selectTriggerHandle, error: ${error}`)
        }
    }

    return (
        <div className={`${styles['ui_accordion']} ${contentTab ? styles['accordion_tab_content'] : ''}`}>
            <div className={styles['content_box']}>
                {data.map((item, id) => {
                    return (
                        <AccordionItem
                            title={item['title']}
                            key={id}
                            active={selectItem.includes(id) || openAll}
                            onClick={() => {
                                selectTriggerHandle(id)
                            }}
                            content={item['content']}
                            contentTab={contentTab}
                        />
                    )
                })}
            </div>

            {
                contentTab &&
                <div className={styles['content_tab_box']}>
                    <div
                        className={`${styles['content_tab']}`}>
                        {data[selectItem]?.["content"]}
                    </div>
                </div>
            }
        </div>
    );
}

export default Accordion;
