'use client'

import React from 'react';
import Link from "next/link";
import {ButtonArrow} from "@/shared/uikit/button";
import stylesTag from "@/styles/ui-tags.module.sass";
import {mediaImgSrc} from "@/shared/constants/options";
import styles from '@/styles/ui-catalog-card.module.sass'
import {useCurrencyFormat} from "@/shared/hooks";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogCard(props) {
    const {cardData, cardDataInfo, i18n, redirectUrl} = props

    const convertCurrency = useCurrencyFormat()

    return (
        <div className={styles['ui_catalog_card']}>
            <div className={styles['card_photo']}>
                <Link href={`/catalog/${redirectUrl}/${cardData?.["id"]}`}>
                    <Image
                        src={mediaImgSrc(cardDataInfo?.["photo_preview"]?.["item"]?.["data"]?.["attributes"]?.["url"])}
                        alt={cardDataInfo?.["name"]}
                        priority={true}
                        width={1024}
                        height={768}
                    />
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/catalog/${redirectUrl}/${cardData?.["id"]}`}>
                    <h3 className={styles['title']}>{cardDataInfo?.["name"]}</h3>
                </Link>

                {cardDataInfo?.["price"] && <h4 className={styles['price']}>{convertCurrency(cardDataInfo?.["price"])}</h4>}

                <div className={styles['short_info']}>
                    {
                        cardDataInfo?.["an_initial_fee"] &&
                        <p className={styles['info']}>
                            <span className={styles['key']}>{i18n?.["catalog.initial.free"]}</span>
                            <span className={styles['value']}>{convertCurrency(cardDataInfo?.["an_initial_fee"])}</span>
                        </p>
                    }
                </div>

                <div className={styles['action_info']}>
                    <div className={styles['tags']}>
                        <ul className={`${stylesTag['tags_list']}`}>
                            {
                                Object.values(cardDataInfo?.["tags"]?.["data"] || {}).map((tagItem, tagId) => {
                                    return (
                                        <li className={stylesTag['tag_item']} key={tagId}>{tagItem?.["attributes"]?.["name"]}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <ButtonArrow
                        title={i18n?.["site"]?.["more"]}
                        url={`/catalog/${redirectUrl}/${cardData?.["id"]}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default CatalogCard;
