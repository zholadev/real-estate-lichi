import React from 'react';
import styles from "@/styles/main.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function TagListSecondary(props) {
    const {listTags, i18n, style} = props

    return (
        <div className={'container_md'}>
            <ul className={styles['main_bottom_list']} style={style}>
                {
                    listTags.map((cityItem) => {
                        return (
                            <li className={styles['list_item']} key={cityItem.id}>
                                {cityItem.title}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default TagListSecondary;
