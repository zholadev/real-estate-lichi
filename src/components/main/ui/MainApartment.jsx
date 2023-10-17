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
    const {cityData, i18n, col, title} = props

    return (
        <div className={styles['main_apartment']}>
            <div className={styles['title']}>{title}</div>

            <div className={`${styles['list']} ${styles[`list_${col}`]}`}>
                <PrimaryCard/>
                <PrimaryCard/>
                <PrimaryCard/>
                <PrimaryCard/>
                <PrimaryCard/>
                <PrimaryCard/>
            </div>

            <div className={styles['more_btn_place']}>
                <ButtonArrow
                    title={i18n?.["site"]?.["see_more"]}
                    url={'/catalog'}
                />
            </div>
        </div>
    );
}

export default MainApartment;
