import React from 'react';
import styles from '@/styles/main.module.sass'
import {PrimaryCard} from "@/shared/uikit/cards/primaryCard";
import {ButtonArrow} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @last-updated 11.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function PropertyList(props) {
    const {i18n = {}, col = 3, title = '', data = {}, url} = props

    const apartmentData = Object.values(data || {})

    if (apartmentData.length === 0) {
        return null
    }

    return (
        <section className={styles['main_apartment']}>
            <div className={styles['title']}>{title}</div>

            <div className={`${styles['list']} ${styles[`list_${col}`]}`}>
                {
                    apartmentData.map((item, id) => {
                        return (
                            <PrimaryCard key={id} cardData={item}/>
                        )
                    })
                }
            </div>

            <div className={styles['more_btn_place']}>
                <ButtonArrow
                    url={url}
                    title={i18n?.["site"]?.["see_more"]}
                />
            </div>
        </section>
    );
}

export default PropertyList;
