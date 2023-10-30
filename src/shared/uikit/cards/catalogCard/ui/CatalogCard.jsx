'use client'

import React from 'react';
import styles from '@/styles/ui-catalog-card.module.sass'
import {IMG} from "@/shared/constants/constants";
import {ButtonArrow} from "@/shared/uikit/button";
import {TagList} from "@/shared/uikit/tags";
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogCard(props) {
    const {catalogData, i18n, redirectUrl} = props

    return (
        <div className={styles['ui_catalog_card']}>
            <div className={styles['card_photo']}>
                <Link href={`/catalog/${redirectUrl}`}>
                    <img
                        src={redirectUrl === 'apartment' ? IMG.posterDubaiApartmentPage['src'] : IMG.templateCatalogCard['src']}
                        alt={'alt'}/>
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/catalog/${redirectUrl}`}>
                    <h3 className={styles['title']}>2-BEDROOM (190 кв.м2)</h3>
                </Link>

                <h4 className={styles['price']}>ОТ ~3.836.000 $</h4>

                <div className={styles['short_info']}>
                    <p className={styles['info']}>
                        <span className={styles['key']}>Первоначальный взнос</span>
                        <span className={styles['value']}>ОТ ~105.000 $</span>
                    </p>
                    <p className={styles['info']}>
                        <span className={styles['key']}>План оплаты</span>
                        <span className={styles['value']}>20% При бронировании <br/> 80% Во время строительства</span>
                    </p>
                </div>

                <div className={styles['action_info']}>
                   <div className={styles['tags']}>
                       <TagList/>
                   </div>
                    <ButtonArrow
                        title={i18n?.["site"]?.["more"]}
                        url={`/catalog/${redirectUrl}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default CatalogCard;
