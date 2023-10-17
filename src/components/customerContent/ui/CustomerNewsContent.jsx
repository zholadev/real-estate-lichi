import React from 'react';
import {ButtonArrow} from "@/shared/uikit/button";
import {NewsCard} from "@/shared/uikit/cards/newsCard";
import styles from '@/styles/customer_content.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 12.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CustomerNewsContent(props) {
    const {i18n, title, btnOff} = props

    return (
        <section className={styles['news_content']}>
            <h3 className={styles['title']}>{title}</h3>

            <div className={styles['list']}>
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
            </div>

            {
                !btnOff &&
                <div className={styles['more_btn_place']}>
                    <ButtonArrow
                        title={i18n?.["news"]?.["more_news_title"]}
                        url={'/news'}
                    />
                </div>
            }
        </section>
    );
}

export default CustomerNewsContent;
