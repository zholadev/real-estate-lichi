import React from 'react';
import styles from "@/styles/ui-tags.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function TagList(props) {
    const {list, center} = props

    return (
        <ul className={`${styles['tags_list']} ${center ? styles['center_content'] : ''}`}>
            <li className={styles['tag_item']}>видовая</li>
            <li className={styles['tag_item']}>новостройки</li>
            <li className={styles['tag_item']}>у воды</li>
            <li className={styles['tag_item']}>центр</li>
            <li className={styles['tag_item']}>крутой ЖК</li>
            <li className={styles['tag_item']}>видовая</li>
            <li className={styles['tag_item']}>новостройки</li>
            <li className={styles['tag_item']}>у воды</li>
            <li className={styles['tag_item']}>центр</li>
            <li className={styles['tag_item']}>крутой ЖК</li>
        </ul>
    );
}

export default TagList;
