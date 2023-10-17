import React from 'react';
import styles from '@/styles/object-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailInfo(props) {
    const {i18n} = props

    return (
        <div className={styles['info']}>
            <h2>Описание</h2>

            <p>Великолепные апартаменты 58 м2 с 1 спальней. Апартаменты меблированы, кухня укомлектована. Удобное
                месторасположение рядом с метро. Вид на канал.</p>
            <p>Полностью укомплектованная квартира с видом на канал в районе Business Bay, рядом станция метро Business
                Bay.</p>

            <div className={styles['subtitle']}>Характеристика:</div>

            <ul className={styles['info_list']}>
                <li className={styles['list_item']}>Площадь: 58 м2</li>
                <li className={styles['list_item']}>Комнаты:1 спальня и гостиная</li>
                <li className={styles['list_item']}>Ванных комнат: 1</li>
                <li className={styles['list_item']}>Вид: на канал</li>
                <li className={styles['list_item']}>Количество парковочных мест: 1</li>
            </ul>

            <p>С мебелью, укомплектованной кухней и техникой.</p>
            <p>Более подробная информация, планировки, спецификации, оперативные показы онлайн и живьем, индивидуальный
                подбор недвижимости, возможность покупки дистанционно, сопровождение банковских переводов при покупке
                недвижимости.</p>
        </div>
    );
}

export default ObjectDetailInfo;
