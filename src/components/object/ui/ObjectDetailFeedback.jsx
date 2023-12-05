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
    const {i18n, managerData} = props

    const getManagerData = useMemo(() => {
        return {
            "info": managerData?.["data"]?.[0]?.["attributes"]?.["info"],
            "contacts": managerData?.["data"]?.[0]?.["attributes"]?.["contacts"],
            "lastname": managerData?.["data"]?.[0]?.["attributes"]?.["lastname"],
            "firstname": managerData?.["data"]?.[0]?.["attributes"]?.["firstname"],
            "photo": managerData?.["data"]?.[0]?.["attributes"]?.["photo"]?.["item"]?.["data"]?.["attributes"]?.["url"],
        }
    }, [managerData])

    if (Object.values(managerData?.["data"] || {}).length === 0) {
        return null
    }

    return (
        <div className={styles['feedback']}>
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
                            <div className={styles['value']}>{getManagerData?.["firstname"]} {getManagerData?.["lastname"]}</div>
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

                    <Button
                        type={'secondary'}
                        title={i18n?.["feedback"]?.["order_call_title"]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ObjectDetailFeedback;
