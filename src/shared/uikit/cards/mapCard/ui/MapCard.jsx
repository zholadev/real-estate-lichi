'use client'

import React from 'react';
import styles from '@/styles/ui-card-map.module.sass'
import {ButtonArrow} from "@/shared/uikit/button";
import {IMG} from "@/shared/constants/constants";
import {useMediaMaxState} from "@/shared/hooks";
import {mediaImgSrc} from "@/shared/constants/options";

function MapCard(props) {
    const {data, redirect, i18n, totalData, page} = props

    const mediaSmQuery = useMediaMaxState({screenSize: 576})

    return (
        mediaSmQuery ?
            <div className={styles['card_map']}>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['title']}>{data?.["name"]}</div>
                    </div>
                </div>
                <div className={styles['img']}>
                    <img src={mediaImgSrc(`${data?.["photo"]?.["data"]?.["attributes"]?.["url"]}`)} alt=""/>
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        {totalData?.["price"] && <div className={styles['price']}>$ {totalData?.["price"]}</div>}
                    </div>
                </div>
            </div>
            :
            <div className={styles['card_map']}>
                <div className={styles['img']}>
                    <img src={mediaImgSrc(`${data?.["photo"]?.["data"]?.["attributes"]?.["url"]}`)} alt=""/>
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['title']}>{data?.["name"]}</div>

                        {totalData?.["price"] && <div className={styles['price']}>$ {totalData?.["price"]}</div>}
                    </div>
                    <div className={styles['info_footer']}>
                        <ButtonArrow
                            title={i18n?.["site.more.title"]}
                            url={`/catalog/${redirect}/${page}`}
                            type={'small'}
                        />
                    </div>
                </div>
            </div>
    );
}

export default MapCard;
