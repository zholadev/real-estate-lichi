

import React from 'react';
import Link from "next/link";
import styles from '@/styles/ui-card-news.module.sass'
import {mediaImgSrc} from "@/shared/constants/options";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsCard(props) {
    const {i18n, descripOff, newsData, id} = props

    return (
        <div className={styles['news_card']}>
            <div className={styles['img']}>
                <Link href={`/news/${id}`}>
                    <Image
                        src={mediaImgSrc(newsData?.["images"]?.["data"]?.[0]?.["attributes"]?.["url"])}
                        alt={newsData?.["title"]}
                        priority={true}
                        width={1024}
                        height={768}
                    />
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/news/${id}`}>
                    <h4 className={styles['title']}>{newsData?.["title"]}</h4>
                </Link>
                <div className={styles['date']}>{newsData?.["date"]}</div>
                {!descripOff &&
                    <p className={styles['description']}>{newsData?.["short_description"]}</p>}
            </div>
        </div>
    );
}

export default NewsCard;
