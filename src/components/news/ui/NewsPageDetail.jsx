'use client'

import React from 'react';
import styles from '@/styles/news-page-info.module.sass'
import {TagList} from "@/shared/uikit/tags";
import {mediaImgSrc} from "@/shared/constants/options";
import {ConstructorHtml} from "@/entities/constructorHtml";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @name NewsPageDetail
 * @created 20.09.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsPageDetail(props) {
    const {newsData, i18n} = props

    const data = newsData?.["attributes"]

    return (
        <section className={`${styles['news_page_info']} container-lg`}>
            <h2 className={styles['title']}>{data?.["title"]}</h2>
            <div className={styles['date']}>{data?.["date"]}</div>

            <article className={styles['news_detail_info']}>
                {
                    newsData?.["attributes"]?.["images"]?.["data"]?.[0]?.["attributes"]?.["url"] &&
                    <div className={styles['news_detail_picture']}>
                       <div className={styles['picture_box_sticky']}>
                           <Image
                               src={mediaImgSrc(newsData?.["attributes"]?.["images"]?.["data"]?.[0]?.["attributes"]?.["url"])}
                               alt={newsData?.["title"]}
                               priority={true}
                               width={1024}
                               height={768}
                           />
                           <TagList i18n={i18n} center list={newsData?.["attributes"]?.["tags"]} tagName={"item"}/>
                       </div>
                    </div>
                }

                <div className={styles['text_content']}>
                    <ConstructorHtml jsonHtmlData={newsData?.["attributes"]?.["content"]}/>
                </div>
            </article>

            <div className={styles['share_place']}>
                {/*<h4 className={styles['share_text']}>{i18n?.["site"]?.["share_title"]}</h4>*/}
                {/*<i className={styles['share_icon']}/>*/}
            </div>
        </section>
    );
}

export default NewsPageDetail;
