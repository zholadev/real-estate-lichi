

import React from 'react';
import styles from '@/styles/ui-card-primary.module.sass'
import Link from "next/link";
import {mediaImgSrc} from "@/shared/constants/options";
import Image from "next/image";
import {IMG} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PrimaryCard(props) {
    const {cardData} = props

    const photoUrl = cardData?.["attributes"]?.["photo_preview"]?.["item"]?.["data"]?.["attributes"]?.["url"]
    const photoHash = cardData?.["attributes"]?.["photo_preview"]?.["item"]?.["data"]?.["attributes"]?.["hash"];

    return (
        <div className={styles['ui_card_primary']}>
            <div className={styles['card_photo']}>
                <Link href={`/catalog/apartment/${cardData?.["id"]}`}>
                    <Image
                        src={mediaImgSrc(photoUrl)}
                        alt={cardData?.["attributes"]?.["name"]}
                        priority={true}
                        width={1024}
                        height={768}
                        placeholder={'blur'}
                        blurDataURL={IMG.template}
                    />
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={`/catalog/apartment/${cardData?.["id"]}`}>
                    <div className={styles['title']}>{cardData?.["attributes"]?.["name"] ?? "KETURAH RESERVE"}</div>
                </Link>

                <p className={styles['description']}>{cardData?.["attributes"]?.["short_description"] ?? "Стремясь к звездам, Binghatti x Jacob & Co. запускают продажи самого высокого жилого небоскреба в мире."}</p>
            </div>
        </div>
    );
}

export default PrimaryCard;
