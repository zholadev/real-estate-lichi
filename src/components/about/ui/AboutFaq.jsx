import React from 'react';
import Content from "./Tab/Content";
import {Accordion} from "@/shared/uikit/accordion";
import styles from '@/styles/about-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutFaq(props) {
    const {i18n} = props

    const data = [
        {
            id: 1,
            title: "Вилла",
            content: <Content i18n={i18n}/>
        },
        {
            id: 2,
            title: "Квартира",
            content: <Content i18n={i18n}/>
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
