'use client'

import React from 'react';
import Image from "next/image";
import {ButtonArrow} from "@/shared/uikit/button";
import styles from '@/styles/ui-card-map.module.sass'
import {mediaImgSrc} from "@/shared/constants/options";
import {useCurrencyFormat, useMediaMaxState} from "@/shared/hooks";

function MapCard(props) {
    const {data, redirect, i18n, totalData, page} = props

    const convertCurrency = useCurrencyFormat()

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
                    <Image
                        src={mediaImgSrc(`${data?.["photo"]?.["data"]?.[0]?.["attributes"]?.["url"]}`)}
                        alt={data?.["name"]}
                        priority={true}
                        width={312}
                        height={468}
                    />
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        {totalData?.["price"] &&
                            <div className={styles['price']}>{convertCurrency(totalData?.["price"])}</div>}
                    </div>
                </div>
            </div>
            :
            <div className={styles['card_map']}>
                <div className={styles['img']}>
                    <Image
                        src={mediaImgSrc(`${data?.["photo"]?.["data"]?.[0]?.["attributes"]?.["url"]}`)}
                        alt={data?.["name"]}
                        priority={true}
                        width={312}
                        height={468}
                    />
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['title']}>{data?.["name"]}</div>

                        {totalData?.["price"] &&
                            <div className={styles['price']}>{convertCurrency(totalData?.["price"])}</div>}
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
