import React from 'react';
import styles from '@/styles/ui-card-primary.module.sass'
import {IMG} from "@/shared/constants/constants";
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PrimaryCard(props) {
    const {cardData} = props

    const images = [IMG.templateCard['src'], IMG.templateCard2['src']]

    return (
        <div className={styles['ui_card_primary']}>
            <div className={styles['card_photo']}>
                <Link href={'/catalog/apartment'}>
                    <img src={images[Math.floor(Math.random() * 2)]} alt={'...'}/>
                </Link>
            </div>

            <div className={styles['card_info']}>
                <Link href={'/catalog/apartment'}>
                    <div className={styles['title']}>{cardData?.["title"] ?? "REPO"}</div>
                </Link>
                <div className={styles['subtitle']}>{cardData?.["subtitle"] ?? "2-BEDROOM (311 м2)"}</div>

                <p className={styles['description']}>{cardData?.["description"] ?? "Стремясь к звездам, Binghatti x Jacob & Co. запускают продажи самого высокого жилого небоскреба в мире."}</p>
            </div>
        </div>
    );
}

export default PrimaryCard;
