'use client'

import React from 'react';
import styles from '@/styles/main.module.sass'
import {IMG} from "@/shared/constants/constants";
import {ButtonArrow} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MainAboutInfo(props) {
    const {i18n} = props

    return (
        <section className={styles['main_about_us']}>
            <div className={`${styles['title']} body_title`}>{i18n?.["about"]?.["title"]}</div>

            <section className={styles['about_us_info']}>
                <article className={`${styles['article_item']} ${styles['article_item_left']}`}>
                    <p dangerouslySetInnerHTML={{__html: i18n?.["about"]?.["first_desc"]}}/>
                    <img src={IMG.templateAboutUs1['src']} alt=""/>
                </article>

                <article className={`${styles['article_item']} ${styles['article_item_right']}`}>
                    <img src={IMG.templateAboutUs2['src']} alt=""/>
                    <p dangerouslySetInnerHTML={{__html: i18n?.["about"]?.["sec_desc"]}}/>
                </article>
            </section>

            <div className={styles['more_btn_place']}>
                <ButtonArrow
                    title={i18n?.["site"]?.["more"]}
                    url={'/about'}
                />
            </div>
        </section>
    );
}

export default MainAboutInfo;
