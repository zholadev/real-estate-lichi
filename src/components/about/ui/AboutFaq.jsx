'use client'

import React from 'react';
import styles from '@/styles/about-page.module.sass'
import {PAGE} from "@/shared/constants/constants";
import {Button} from "@/shared/uikit/button";
import {Accordion} from "@/shared/uikit/accordion";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutFaq(props) {
    const {i18n} = props

    const ContentTab = () => {
        return (
            <div className={styles['faq_info']}>
                <div className={styles['top_info']}>
                    <p>{i18n?.["page.about.description.significance"]}</p>
                    <p>{i18n?.["page.about.description.development.model"]}</p>
                </div>

                <Image
                    priority={true}
                    width={1024}
                    height={768}
                    src={PAGE.about.aboutPageObject['src']}
                    alt=""
                    className={styles['img']}
                />
                <Button
                    type={'secondary'}
                    title={i18n?.["site"]?.["get_object"]}
                />
            </div>
        )
    }

    const data = [
        {
            id: 1,
            title: "Вилла",
            content: <ContentTab/>
        },
        {
            id: 1,
            title: "Вилла",
            content: <ContentTab/>
        },
        {
            id: 1,
            title: "Вилла",
            content: <ContentTab/>
        },
        {
            id: 1,
            title: "Вилла",
            content: <ContentTab/>
        },
        {
            id: 1,
            title: "Вилла",
            content: <ContentTab/>
        },
    ]


    return (
        <div className={styles['about_faq']}>
            <div className={styles['faq_accordion']}>
                <Accordion isSingle data={data} contentTab/>
            </div>
        </div>
    );
}

export default AboutFaq;
