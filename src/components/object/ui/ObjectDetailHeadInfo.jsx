'use client'

import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {Button} from "@/shared/uikit/button";
import {useCurrencyFormat} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @todo
 * @returns {Element}
 * @constructor
 */
function ObjectDetailHeadInfo(props) {
    const {i18n, data} = props

    const convertCurrency = useCurrencyFormat()

    return (
        <div className={styles['preview_head_info']}>
            <h1 className={styles['title']}>{data?.["name"]}</h1>

            <ul className={styles['preview_head_characters']}>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["price"]}</span>
                    <span className={styles['value']}>{convertCurrency(data?.["price"])} $</span>
                </li>
                {
                    Object.values(data?.["build_info"] || {}).map((info, id) => {
                        return (
                            <li className={styles['characters_item']} key={id}>
                                <span className={styles['key']}>{info?.["name"]}</span>
                                <span className={styles['value']}>{info?.["description"]}</span>
                            </li>
                        )
                    })
                }
                {
                    data?.["residence"]?.["name"] &&
                    <li className={styles['characters_item']}>
                        <span className={styles['key']}>{i18n?.["characters"]?.["resident_complex"]}</span>
                        <span className={styles['value']}>{data?.["residence"]?.["name"]}</span>
                    </li>
                }

                {
                    data?.["district"] &&
                    <li className={styles['characters_item']}>
                        <span className={styles['key']}>{i18n?.["characters"]?.["area"]}</span>
                        <span className={styles['value']}>{data?.["district"]?.["name"]}</span>
                    </li>
                }

                {
                    data?.["rooms"] &&
                    <li className={styles['characters_item']}>
                        <span className={styles['key']}>Rooms</span>
                        <span className={styles['value']}>{data?.["rooms"]?.["name"]}</span>
                    </li>
                }

                {
                    data?.["country"] &&
                    <li className={styles['characters_item']}>
                        <span className={styles['key']}>Country</span>
                        <span className={styles['value']}>{data?.["country"]?.["country_name"]}</span>
                    </li>
                }
            </ul>

            <Button
                title={i18n?.["object"]?.["sign_up_view"]}
            />
        </div>
    );
}

export default ObjectDetailHeadInfo;
