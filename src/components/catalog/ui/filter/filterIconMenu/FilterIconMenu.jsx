import React from 'react';
import styles from "@/styles/catalog-filter.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 05.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterIconMenu(props) {
    const {i18n, toggleFilterHandle} = props

    return (
        <div className={styles['filter_sm_action']} onClick={toggleFilterHandle}>
            <div className={styles['menu']}>
                <div className={`${styles['item']} ${styles['item_1']}`}></div>
                <div className={`${styles['item']} ${styles['item_2']}`}></div>
                <div className={`${styles['item']} ${styles['item_3']}`}></div>
            </div>
            <span className={styles['text']}>{i18n?.["filter.title"]}</span>
        </div>
    );
}

export default FilterIconMenu;
