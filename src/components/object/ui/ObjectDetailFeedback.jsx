'use client'

import React, {useMemo} from 'react';
import styles from '@/styles/object-page.module.sass'
import {Button} from "@/shared/uikit/button";
import {mediaImgSrc} from "@/shared/constants/options";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailFeedback(props) {
    const {i18n, data, hideButton, typeCard = 'primary', onClick} = props

    const getManagerData = useMemo(() => {
        return {
            "info": data?.["data"]?.[0]?.["attributes"]?.["info"],
            "contacts": data?.["data"]?.[0]?.["attributes"]?.["contacts"],
            "lastname": data?.["data"]?.[0]?.["attributes"]?.["lastname"],
            "firstname": data?.["data"]?.[0]?.["attributes"]?.["firstname"],
            "photo": data?.["data"]?.[0]?.["attributes"]?.["photo"]?.["item"]?.["data"]?.["attributes"]?.["url"],
        }
    }, [data])

    if (Object.values(data?.["data"] || {}).length === 0) {
        return null
    }

    return (
        <div className={`${styles['feedback']} ${typeCard === 'secondary' ? styles['feedback_sc'] : ''}`}>
            <h4 className={styles['title']}>{i18n?.["feedback"]?.["feedback_title"]}</h4>

            <div className={styles['feedback_info']}>
                <Image
                    src={mediaImgSrc(`${getManagerData?.["photo"]}`)}
                    alt={getManagerData?.["firstname"]}
                    priority={true}
                    width={1024}
                    height={768}
                />

                <div className={styles['board']}>
                    <ul className={styles['board_info_list']}>
                        <li className={styles['list_item']}>
                            <div className={styles['key']}>{i18n?.["form.contact.title"]}:</div>
                            <div
                                className={styles['value']}>{getManagerData?.["firstname"]} {getManagerData?.["lastname"]}</div>
                        </li>

                        {
                            Object.values(getManagerData?.["info"] || {}).map((infoItem, infoId) => {
                                return (
                                    <li className={styles['list_item']} key={infoId}>
                                        <div className={styles['key']}>{infoItem?.["name"]}:</div>
                                        <div className={styles['value']}>{infoItem?.["description"]}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    {
                        !hideButton &&
                        <ul className={styles['board_media_list']}>
                            {
                                Object.values(getManagerData?.["contacts"] || {}).map((infoItem, infoId) => {
                                    return (
                                        <li className={styles['list_item']} key={infoId}>
                                            <i className={`${styles['icon']} ${styles[`${infoItem?.["name"]}_icon`]}`}/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }

                    {
                        !hideButton &&
                        <Button
                            type={'secondary'}
                            onClick={onClick}
                            title={i18n?.["feedback"]?.["order_call_title"]}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default ObjectDetailFeedback;
