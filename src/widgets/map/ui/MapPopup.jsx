import React from 'react';
import Image from "next/image";
import {useCurrencyFormat} from "@/shared/hooks";
import {ButtonArrow} from "@/shared/uikit/button";
import styles from "@/styles/widget-map.module.sass";
import {mediaImgSrc} from "@/shared/constants/options";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapPopup(props) {
    const {data, url, i18n, name, price, photo, isBtn} = props

    const convertCurrency = useCurrencyFormat()

    return (
        <section className={`${styles['map_popup']} ${!isBtn ? styles['map_popup_cs'] : ''}`}>
            <div className={styles['info']}>
                <h3 className={styles['popup_title']}>{name}</h3>

                {
                    price &&
                    <div className={styles['popup_price']}>{convertCurrency(price)}</div>
                }
            </div>

            <Image
                src={mediaImgSrc(photo)}
                alt={name}
                priority={true}
                width={200}
                height={200}
            />

            {
                isBtn &&
                <div className={styles['popup_btn']}>
                    <ButtonArrow
                        title={i18n?.["site.more.title"]}
                        url={`${url}/${data?.["id"]}`}
                        type={'small'}
                    />
                </div>
            }
        </section>
    );
}

export default MapPopup;
