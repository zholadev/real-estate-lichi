'use client'

import React from 'react';
import styles from '@/styles/object-page.module.sass'
import Image from "next/image";
import {mediaImgSrc} from "@/shared/constants/options";

// TODO: Сделать общим

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectLayout(props) {
    const {i18n, apartmentData} = props

    return (
        <div className={styles['object_layout']}>
            <h2>{i18n?.["object"]?.["layout_title"]}</h2>

            <div className={`${styles['layout_board_info']} container_md`}>
                <img
                    src={mediaImgSrc(`${apartmentData?.["attributes"]?.["layouts"]?.[0]?.["images"]?.["data"]?.[0]?.["attributes"]?.["url"]}`)}
                    alt={apartmentData?.["attributes"]?.["name"]}/>

                <div className={styles['info']}>
                    <span
                        className={styles['info_subtitle']}>{apartmentData?.["attributes"]?.["layouts"]?.[0]?.["name"]}</span>

                    <ul className={styles['board_info_list']}>
                        {
                            Object.values(apartmentData?.["attributes"]?.["layouts"]?.[0]?.["locates"] || {}).map((item, id) => {
                                return (
                                    <li className={styles['list_item']} key={id}>{item?.["locate"]}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ObjectLayout;
