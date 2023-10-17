import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {IMG} from "@/shared/constants/constants";
import dynamic from "next/dynamic";

// TODO: Сделать общим

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectLayout(props) {
    const {i18n} = props

    return (
        <div className={styles['object_layout']}>
            <h2>{i18n?.["object"]?.["layout_title"]}</h2>

            <div className={`${styles['layout_board_info']} container_md`}>
                <img src={IMG.templateLayout['src']} alt=""/>

                <div className={styles['info']}>
                    <span className={styles['info_subtitle']}>2х комнатная квартира для небольшой семьи</span>

                    <ul className={styles['board_info_list']}>
                        <li className={styles['list_item']}>Гостинная</li>
                        <li className={styles['list_item']}>Спальня</li>
                        <li className={styles['list_item']}>Изолированная кухня</li>
                        <li className={styles['list_item']}>2 санузла</li>
                        <li className={styles['list_item']}>Вид на 2 стороны</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ObjectLayout;
