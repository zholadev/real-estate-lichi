'use client'

import React from 'react';
import {ButtonArrow} from "@/shared/uikit/button";
import {NewsCard} from "@/shared/uikit/cards/newsCard";
import {routerPage} from "@/entities/router/model/pages";
import styles from '@/styles/customer_content.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 12.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CustomerNewsContent(props) {
    const {i18n = {}, title = '', btnOff = false, newsData = []} = props

    return (
        <section className={styles['news_content']}>
            <h3 className={styles['title']}>{title}</h3>

            <div className={styles['list']}>
                {
                    newsData.map((newsItem) => {
                        return (
                            <NewsCard
                                key={newsItem?.["id"]}
                                id={newsItem?.["id"]}
                                newsData={newsItem?.["attributes"]}
                            />
                        )
                    })
                }
            </div>

            {
                !btnOff &&
                <div className={styles['more_btn_place']}>
                    <ButtonArrow
                        url={routerPage.news}
                        title={i18n?.["news"]?.["more_news_title"]}
                    />
                </div>
            }
        </section>
    );
}

export default CustomerNewsContent;
