import React from 'react';
import styles from '@/styles/about-page.module.sass'
import {PAGE} from "@/shared/constants/constants";
import {Button} from "@/shared/uikit/button";
import {Accordion} from "@/shared/uikit/accordion";

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
                    <p>Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей
                        активности позволяет выполнять важные задания по разработке системы обучения кадров,
                        соответствует
                        насущным потребностям.</p>
                    <p>С другой стороны реализация намеченных плановых заданий способствует подготовки и реализации
                        модели
                        развития. </p>
                </div>

                <img src={PAGE.about.aboutPageObject['src']} alt="" className={styles['img']}/>
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
