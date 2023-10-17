'use client'

import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {IMG} from "@/shared/constants/constants";
import styles from '@/styles/ui-card-news.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsCard(props) {
    const {cardData, i18n, descripOff} = props

    const imgs = [IMG.templateNews1['src'], IMG.templateNews2['src']]

    const router = useRouter()

    return (
        <div className={styles['news_card']}>
            <Link href={`/news/settings`}>
                <img src={imgs[Math.floor(Math.random() * 2)]} alt="" onClick={() => router.push('/news/settings')}/>
            </Link>

            <div className={styles['card_info']}>
                <Link href={`/news/settings`}>
                    <h4 className={styles['title']}>Открытие новой дороги</h4>
                </Link>
                <div className={styles['date']}>12 сентября 2023</div>
                {!descripOff &&
                    <p className={styles['description']}>Германия подтвердила конфискацию товаров у въезжающих
                        россиян.</p>}
            </div>
        </div>
    );
}

export default NewsCard;
