'use client'

import React from 'react';
import Image from "next/image";
import {ZoomContainer} from "@/shared/uikit/zoom";
import styles from '@/styles/object-page.module.sass'
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
    const {i18n, data} = props

    if (Object.values(data || {}).length === 0) {
        return null
    }

    return (
        <div className={styles['object_layout']}>
            <h2>{i18n?.["object"]?.["layout_title"]}</h2>

            <div className={`${styles['layout_board_info']}`}>
                <ZoomContainer>
                    <Image
                        height={768}
                        width={1024}
                        priority={true}
                        alt={data?.["name"]}
                        src={mediaImgSrc(`${data?.["images"]?.["data"]?.[0]?.["attributes"]?.["url"]}`)}
                    />
                </ZoomContainer>

                <div className={styles['info']}>
                    <span
                        className={styles['info_subtitle']}>{data?.["name"]}</span>

                    <ul className={styles['board_info_list']}>
                        {
                            Object.values(data?.["locates"] || {}).map((item, id) => {
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
