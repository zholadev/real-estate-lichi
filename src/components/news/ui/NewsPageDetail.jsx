

import React from 'react';
import Image from "next/image";
import {TagList} from "@/shared/uikit/tags";
import {mediaImgSrc} from "@/shared/constants/options";
import styles from '@/styles/news-page-info.module.sass'
import {ConstructorHtml} from "@/entities/constructorHtml";
import {extractAttribute} from "@/shared/utilites";

/**
 * @author Zholaman Zhumanov
 * @name NewsPageDetail
 * @last-updated 19.01.2024 - Zholaman Zhumanov
 * @update-descripion refactoring
 * @todo refactoring
 * @created 20.09.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsPageDetail(props) {
    const {newsData, i18n} = props

    return (
        <section className={`${styles['news_page_info']} container-lg`}>
            <h2 className={styles['title']}>{extractAttribute("title", newsData)}</h2>
            <div className={styles['date']}>{extractAttribute("date", newsData)}</div>

            <article className={styles['news_detail_info']}>
                {
                    extractAttribute("images.data.0.attributes.url", newsData) &&
                    <div className={styles['news_detail_picture']}>
                        <div className={styles['picture_box_sticky']}>
                            <Image
                                width={1024}
                                height={768}
                                priority={true}
                                alt={extractAttribute("title", newsData)}
                                src={mediaImgSrc(extractAttribute("images.data.0.attributes.url", newsData))}
                            />
                            <TagList i18n={i18n} center list={extractAttribute("tags", newsData)} tagName={"item"}/>
                        </div>
                    </div>
                }

                <div className={styles['text_content']}>
                    <ConstructorHtml jsonHtmlData={extractAttribute("content", newsData)}/>
                </div>
            </article>
        </section>
    );
}

export default NewsPageDetail;
