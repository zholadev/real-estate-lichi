'use client'

import React from 'react';
import Link from "next/link";
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

    if (Object.values(listTags || {}).length === 0) {
        return null
    }

    return (
        <div className={'container_md'}>
            <ul className={styles['main_bottom_list']} style={style}>
                {
                    Object.values(listTags || {}).map((item, Id) => {
                        return (
                            // <></>
                            // item?.["id"] || item?.["link"] ?
                            <li key={item?.["id"]} className={styles['list_item']}>
                                <Link href={`/catalog/residence/${item?.["id"]?.toString()}`}>
                                    {item?.["attributes"]?.["name"] ?? ""}
                                </Link>
                            </li>
                            // :
                            // <li className={styles['list_item']} key={item?.["id"]}>
                            //     {item?.["attributes"]?.["name"] || item?.["title"] || ""}
                            // </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default TagListSecondary;
