'use client'

import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {Button} from "@/shared/uikit/button";
import {useCurrencyFormat} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailHeadInfo(props) {
    const {i18n, apartmentInfoData} = props

    const convertCurrency = useCurrencyFormat()

    return (
        <div className={styles['preview_head_info']}>
            <h1 className={styles['title']}>{apartmentInfoData?.["name"]}</h1>

            <ul className={styles['preview_head_characters']}>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["price"]}</span>
                    <span className={styles['value']}>{convertCurrency(apartmentInfoData?.["price"])} $</span>
                </li>
                {
                    Object.values(apartmentInfoData?.["build_info"] || {}).map((info, id) => {
                        return (
                            <li className={styles['characters_item']} key={id}>
                                <span className={styles['key']}>{info?.["name"]}</span>
                                <span className={styles['value']}>{info?.["description"]}</span>
                            </li>
                        )
                    })
                }
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["resident_complex"]}</span>
                    <span className={styles['value']}>{apartmentInfoData?.["residence"]?.["data"]?.["attributes"]?.["name"]}</span>
                </li>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["area"]}</span>
                    <span className={styles['value']}>{apartmentInfoData?.["district"]?.["data"]?.["attributes"]?.["name"]}</span>
                </li>
            </ul>

            <Button
                title={i18n?.["object"]?.["sign_up_view"]}
            />
        </div>
    );
}

export default ObjectDetailHeadInfo;
