import React from 'react';
import styles from '@/styles/widget-footer.module.sass'
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FooterPageList(props) {
    const {i18n, footerPageListData} = props

    if (!footerPageListData) {
        return null
    }

    return (
        <ul className={styles['footer_page_list']}>
            {
                footerPageListData.map((listItem, listId) => {
                    return (
                       <Link href={listItem?.["link"]} key={listId} >
                           <li className={styles['page_list_item']}>{listItem?.["title"]}</li>
                       </Link>
                    )
                })
            }
        </ul>
    );
}

export default FooterPageList;
