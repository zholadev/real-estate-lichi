'use client'

import React, {useMemo, useRef} from 'react';
import styles from '@/styles/ui-accordion.module.sass'
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AccordionItem(props) {
    const {active, title, content, onClick, contentTab} = props

    const heightItemRef = useRef(null)

    const mediaMdQuery = useMediaMaxState({screenSize: 768})

    const getHeightHandle = useMemo(() => {
        try {
            return {height: active ? `${heightItemRef?.current?.scrollHeight}px` : "0px"}
        } catch (error) {
            console.log(`page: accordionItem, event: getHeightHandle, error: ${error}`)
        }
    }, [active, contentTab])

    return (
        contentTab ?
            mediaMdQuery ?
                <div className={`${styles['accordion_item']} ${active ? styles['active'] : ''}`}
                     onClick={onClick}>
                    <div className={styles['header']}>
                        <span className={active ? styles['title_active'] : ''}>{title}</span>
                        {active ? <i className={styles['icon_active']}></i> :
                            <i className={styles['icon_disabled']}></i>}
                    </div>
                    <div
                        style={getHeightHandle} ref={heightItemRef}
                        className={`${styles['content']} ${active ? styles['active'] : ''}`}>
                        {content}
                    </div>
                </div>
                :
                <div className={`${styles['accordion_item']}`}
                     onClick={onClick}
                >
                    <div className={styles['header']}>
                        <span className={active ? styles['title_active'] : ''}>{title}</span>
                        {active ? <i className={styles['icon_active']}></i> :
                            <i className={styles['icon_disabled']}></i>}
                    </div>
                </div>
            :
            <div className={`${styles['accordion_item']} ${active ? styles['active'] : ''}`} onClick={onClick}>
                <div className={styles['header']}>
                    <span className={active ? styles['title_active'] : ''}>{title}</span>
                    {active ? <i className={styles['icon_active']}></i> : <i className={styles['icon_disabled']}></i>}
                </div>
                <div
                    style={getHeightHandle} ref={heightItemRef}
                    className={`${styles['content']} ${active ? styles['active'] : ''}`}>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
            </div>
    );
}

export default AccordionItem;
