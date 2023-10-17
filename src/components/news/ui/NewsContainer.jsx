import React, {useMemo} from 'react';
import styles from '@/styles/news-page.module.sass'
import {NewsCard} from "@/shared/uikit/cards/newsCard";
import {CustomerNewsContent} from "@/components/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsContainer(props) {
    const {i18n, newsData} = props

    const news = useMemo(() => {
        return [
            {
                id: 1,
            },{
                id: 1,
            },{
                id: 1,
            },{
                id: 1,
            },
        ]
    }, [])

    return (
        <div className={styles['news_container']}>
            <h1 className={styles['title']}>{i18n?.["news"]?.["news_page_title"]}</h1>

            <article className={`${styles['news_list']} container_sm_pn`}>
                {
                    news.map((newsItem, newsId) => {
                        return (
                            <NewsCard
                                i18n={i18n}
                                key={newsId}
                                descripOff
                            />
                        )
                    })
                }
            </article>
        </div>
    );
}

export default NewsContainer;
