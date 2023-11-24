import React from 'react';
import styles from '@/styles/ui-card-primary.module.sass'
import Link from "next/link";
import {mediaImgSrc} from "@/shared/constants/options";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PrimaryCard(props) {
    const {cardData} = props

    return (
        <div className={styles['ui_card_primary']}>
            <div className={styles['card_photo']}>
                <Link href={`/catalog/apartment/${cardData?.["id"]}`}>
                    <img
                        src={mediaImgSrc(`${cardData?.["attributes"]?.["photo_preview"]?.["big"]?.["data"]?.["attributes"]?.["url"]}`)}
                        alt={cardData?.["attributes"]?.["name"]}/>
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/catalog/apartment/${cardData?.["id"]}`}>
                    <div className={styles['title']}>{cardData?.["attributes"]?.["name"] ?? "KETURAH RESERVE"}</div>
                </Link>
                {/*<div className={styles['subtitle']}>{cardData?.["subtitle"] ?? "2-BEDROOM (311 м2)"}</div>*/}

                <p className={styles['description']}>{cardData?.["attributes"]?.["short_description"] ?? "Стремясь к звездам, Binghatti x Jacob & Co. запускают продажи самого высокого жилого небоскреба в мире."}</p>
            </div>
        </div>
    );
}

export default PrimaryCard;
