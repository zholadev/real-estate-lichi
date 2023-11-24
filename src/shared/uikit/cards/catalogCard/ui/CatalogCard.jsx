'use client'

import React from 'react';
import Link from "next/link";
import {ButtonArrow} from "@/shared/uikit/button";
import stylesTag from "@/styles/ui-tags.module.sass";
import {mediaImgSrc} from "@/shared/constants/options";
import styles from '@/styles/ui-catalog-card.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogCard(props) {
    const {cardData, cardDataInfo, i18n, redirectUrl} = props

    return (
        <div className={styles['ui_catalog_card']}>
            <div className={styles['card_photo']}>
                <Link href={`/catalog/${redirectUrl}/${cardData?.["id"]}`}>
                    <img
                        src={mediaImgSrc(cardDataInfo?.["photo_preview"]?.["big"]?.["data"]?.["attributes"]?.["url"])}
                        alt={'alt'}/>
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/catalog/${redirectUrl}/${cardData?.["id"]}`}>
                    <h3 className={styles['title']}>{cardDataInfo?.["name"]}</h3>
                </Link>

                {cardDataInfo?.["price"] && <h4 className={styles['price']}>{cardDataInfo?.["price"]} $</h4>}

                <div className={styles['short_info']}>
                    {
                        cardDataInfo?.["an_initial_fee"] &&
                        <p className={styles['info']}>
                            <span className={styles['key']}>{i18n?.["catalog.initial.free"]}</span>
                            <span className={styles['value']}>$ {cardDataInfo?.["an_initial_fee"]}</span>
                        </p>
                    }

                    {
                        cardDataInfo?.["payment_plan"] &&
                        <p className={styles['info']}>
                            <span className={styles['key']}>План оплаты</span>
                            <ul className={styles['value']}>
                                {
                                    cardDataInfo?.["payment_plan"].map((item, id) => {
                                        return (
                                            <li key={id}>
                                                <h3>{item?.["name"]}</h3>
                                                <p>{item?.["description"]}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
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
