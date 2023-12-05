'use client'

import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {ConstructorHtml} from "@/entities/constructorHtml";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailInfo(props) {
    const {i18n, apartmentData} = props

    console.log(apartmentData)

    return (
        <div className={styles['info']}>
            <ConstructorHtml jsonHtmlData={apartmentData?.["description"]}/>
        </div>
    );
}

export default ObjectDetailInfo;
