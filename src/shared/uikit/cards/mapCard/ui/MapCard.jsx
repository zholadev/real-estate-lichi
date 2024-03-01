

import React from 'react';
import Image from "next/image";
import {ButtonArrow} from "@/shared/uikit/button";
import styles from '@/styles/ui-card-map.module.sass'
import {mediaImgSrc} from "@/shared/constants/options";
import {useCurrencyFormat} from "@/shared/hooks";
import {extractAttribute} from "@/shared/utilites";

function InfoHeader({data, totalData, convertCurrency, onGetCoordinates, i18n}) {
    return (
        <div className={styles['info_header']}>
            <div className={styles['title']}>{extractAttribute("name", data, true)}</div>
            {extractAttribute("price", totalData, true) &&
                <div className={styles['price']}>{convertCurrency(extractAttribute("price", totalData, true))}</div>}
            <div className={styles['on_the_map']}
                 onClick={onGetCoordinates}>{i18n?.["map.show.location.title"]}</div>
        </div>
    );
}

/**
 * @author Zholaman Zhumanov
 * @last-updated 11.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapCard(props) {
    const {data, totalData, i18n, onGetCoordinates, redirect, page} = props;

    const convertCurrency = useCurrencyFormat();

    const ImgComponent = (
        <div className={styles['image-container']}>
            <Image
                src={mediaImgSrc(extractAttribute("photo.data.0.attributes.url", data, true))}
                alt={extractAttribute("name", data, true)}
                priority={true}
                width={312}
                height={468}
            />
        </div>
    )

    return (
        <div className={styles['card_map']}>
            {ImgComponent}
            <div className={styles['info']}>
                <InfoHeader
                    data={data}
                    totalData={totalData}
                    convertCurrency={convertCurrency}
                    onGetCoordinates={onGetCoordinates}
                    i18n={i18n}
                />
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
