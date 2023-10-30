import React from 'react';
import styles from '@/styles/widget-footer.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FooterContact(props) {
    const {i18n} = props

    return (
        <div className={'w-100'}>
            <ul className={`${styles['footer_page_list']} ${styles['footer_page_list_icon']}`}>
                <li className={`${styles['page_list_item']} ${styles['page_list_item_icon']}`}>
                    <i className={`${styles['icon']} ${styles['phone']}`}/>
                    {i18n?.["site"]?.["site_number_phone"]}
                </li>
                <li className={`${styles['page_list_item']} ${styles['page_list_item_icon']}`}>
                    <i className={`${styles['icon']} ${styles['map_pin']}`}/>
                    {i18n?.["site"]?.["site_address"]}
                </li>
            </ul>
            <ul className={styles['footer_media_list']}>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['vk_icon']}/>
                    </i>
                </li>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['play_icon']}/>
                    </i>
                </li>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['insta_icon']}/>
                    </i>
                </li>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['tiktok_icon']}/>
                    </i>
                </li>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['pinterest_icon']}/>
                    </i>
                </li>
                <li className={styles['media_item']}>
                    <i className={`${styles['icon']}`}>
                        <div className={styles['telegram_icon']}/>
                    </i>
                </li>
            </ul>
        </div>

    );
}

export default FooterContact;
