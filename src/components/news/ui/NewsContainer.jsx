'use client'

import React from 'react';
import {Animation} from "@/shared/uikit/animation";
import styles from '@/styles/news-page.module.sass'
import {NewsCard} from "@/shared/uikit/cards/newsCard";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsContainer(props) {
    const {i18n, newsData = []} = props

    if (newsData.length === 0) {
        return <h4>{i18n?.["site.not_found.title"]}</h4>
    }

    return (
        <div className={styles['news_container']}>
            <h1 className={styles['title']}>{i18n?.["news"]?.["news_page_title"]}</h1>

            <article className={`${styles['news_list']} container_md_pn`}>
                {
                    newsData.map((newsItem, newsId) => {
                        return (
                            <Animation
                                dontRepeat
                                isIntersection
                                key={newsItem?.["id"]}
                                animateType={'fade_up'}
                                style={{
                                    transitionDelay: newsId * 0.100 + 's'
                                }}
                            >
                                <NewsCard
                                    i18n={i18n}
                                    descripOff
                                    id={newsItem?.["id"]}
                                    newsData={newsItem?.["attributes"]}
                                />
                            </Animation>
                        )
                    })
                }
            </article>
        </div>
    );
}

export default NewsContainer;
