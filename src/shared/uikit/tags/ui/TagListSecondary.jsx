import React from 'react';
import styles from "@/styles/main.module.sass";
import Link from "next/link";

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
                    listTags.map((cityItem, cityId) => {
                        return (
                            cityItem?.link ?
                                <Link href={cityItem?.link} key={cityItem.id} className={styles['list_item']}>
                                    <li>
                                        {cityItem.title}
                                    </li>
                                </Link>
                                :
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
