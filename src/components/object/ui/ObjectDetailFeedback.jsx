import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {IMG} from "@/shared/constants/constants";
import {Button} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailFeedback(props) {
    const {i18n} = props

    return (
        <div className={styles['feedback']}>
            <h4 className={styles['title']}>{i18n?.["feedback"]?.["feedback_title"]}</h4>

            <div className={styles['feedback_info']}>
                <img src={IMG.templateFeedbackUser['src']} alt=""/>

                <div className={styles['board']}>
                    <ul className={styles['board_info_list']}>
                        <li className={styles['list_item']}>
                            <div className={styles['key']}>{i18n?.["feedback"]?.["company_title"]}:</div>
                            <div className={`${styles['value']} ${styles['value_bold']}`}>Meta Trast</div>
                        </li>

                        <li className={styles['list_item']}>
                            <div className={styles['key']}>{i18n?.["feedback"]?.["company_title"]}:</div>
                            <div className={styles['value']}>Ольга Добровольская</div>
                        </li>

                        <li className={styles['list_item']}>
                            <div className={styles['key']}>{i18n?.["feedback"]?.["company_title"]}:</div>
                            <div className={styles['value']}>Русский, Аглийский</div>
                        </li>
                    </ul>

                    <ul className={styles['board_media_list']}>
                        <li className={styles['list_item']}>
                            <i className={`${styles['icon']} ${styles['phone_icon']}`}/>
                        </li>
                        <li className={styles['list_item']}>
                            <i className={`${styles['icon']} ${styles['whatsapp_icon']}`}/>
                        </li>
                        <li className={styles['list_item']}>
                            <i className={`${styles['icon']} ${styles['telegram_icon']}`}/>
                        </li>
                    </ul>

                    <Button
                        type={'secondary'}
                        title={i18n?.["feedback"]?.["order_call_title"]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ObjectDetailFeedback;
