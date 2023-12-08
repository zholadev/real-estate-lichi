'use client'

import React from 'react';
import styles from '@/styles/about-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutTopContent(props) {
    const {i18n} = props

    return (
        <div className={styles['page_top_content']}>
            <p className={styles['left_content']}>
                <span>{i18n?.["page.about.description.company"]}</span>
            </p>

            <p className={styles['right_content']}>
                <span>{i18n?.["page.about.description.estate"]}</span>
            </p>
        </div>
    );
}

export default AboutTopContent;
