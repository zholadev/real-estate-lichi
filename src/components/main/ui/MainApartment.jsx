'use client'

import React from 'react';
import styles from '@/styles/main.module.sass'
import {PrimaryCard} from "@/shared/uikit/cards/primaryCard";
import {ButtonArrow} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function MainApartment(props) {
    const {i18n, col, title, data, url} = props

    return (
        <div className={styles['main_apartment']}>
            <div className={styles['title']}>{title}</div>

            <div className={`${styles['list']} ${styles[`list_${col}`]}`}>
                {
                    Object.values(data || {}).map((item, id) => {
                        return (
                            <PrimaryCard key={id} cardData={item}/>
                        )
                    })
                }
            </div>

            <div className={styles['more_btn_place']}>
                <ButtonArrow
                    title={i18n?.["site"]?.["see_more"]}
                    url={url}
                />
            </div>
        </div>
    );
}

export default MainApartment;
