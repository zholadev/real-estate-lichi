'use client'

import React from 'react';
import styles from '@/styles/ui-card-map.module.sass'
import {ButtonArrow} from "@/shared/uikit/button";
import {IMG} from "@/shared/constants/constants";
import {useMediaMaxState} from "@/shared/hooks";

function MapCard(props) {
    const {data} = props

    const mediaSmQuery = useMediaMaxState({screenSize: 576})

    return (
        mediaSmQuery ?
            <div className={styles['card_map']}>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['title']}>2-BEDROOM (190 кв.м2)</div>
                    </div>
                </div>
                <div className={styles['img']}>
                    <img src={IMG.templateMapCard['src']} alt=""/>
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['price']}>ОТ~3.836.000$</div>
                    </div>
                </div>
            </div>
            :
            <div className={styles['card_map']}>
                <div className={styles['img']}>
                    <img src={IMG.templateMapCard['src']} alt=""/>
                </div>
                <div className={styles['info']}>
                    <div className={styles['info_header']}>
                        <div className={styles['title']}>2-BEDROOM (190 кв.м2)</div>

                        <div className={styles['price']}>ОТ~3.836.000$</div>
                    </div>
                    <div className={styles['info_footer']}>
                        <ButtonArrow
                            title={'Подробнее'}
                            url={'/catalog/apartment'}
                        />
                    </div>
                </div>
            </div>
    );
}

export default MapCard;
