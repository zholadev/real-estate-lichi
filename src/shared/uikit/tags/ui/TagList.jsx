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
    const {list, center, tagName, i18n} = props

    if (Object.values(list || {}).length === 0) {
        return null
    }

    return (
        <ul className={`${styles['tags_list']} ${center ? styles['center_content'] : ''}`}>
            {
                Object.values(list || {}).map((tagItem, tagId) => {
                    return (
                        <li className={styles['tag_item']} key={tagItem?.["id"]}>{tagItem?.[tagName]}</li>
                    )
                })
            }
        </ul>
    );
}

export default TagList;
