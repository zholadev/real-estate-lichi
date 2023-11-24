import React from 'react';
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
    const {i18n, newsData} = props
    // const {i18n} = props

    if (Object.values(newsData || {}).length === 0) {
        return <h4>НИЧЕГО НЕ НАЙДЕНО</h4>
    }


    return (
        <div className={styles['news_container']}>
            <h1 className={styles['title']}>{i18n?.["news"]?.["news_page_title"]}</h1>

            <article className={`${styles['news_list']} container_md_pn`}>
                {
                    Object.values(newsData || {}).map((newsItem, newsId) => {
                        return (
                            <NewsCard
                                i18n={i18n}
                                key={newsId}
                                descripOff
                                id={newsItem?.["id"]}
                                newsData={newsItem?.["attributes"]}
                            />
                        )
                    })
                }
            </article>
        </div>
    );
}

export default NewsContainer;
