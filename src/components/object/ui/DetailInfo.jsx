

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
function DetailInfo(props) {
    const {data} = props

    return (
        <div className={styles['info']}>
            <ConstructorHtml jsonHtmlData={data}/>
        </div>
    );
}

export default DetailInfo;
