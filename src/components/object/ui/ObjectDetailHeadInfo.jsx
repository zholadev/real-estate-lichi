import React from 'react';
import styles from '@/styles/object-page.module.sass'
import {Button} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailHeadInfo(props) {
    const {i18n} = props

    return (
        <div className={styles['preview_head_info']}>
            <h1 className={styles['title']}>2-BEDROOM (190 кв.м2)</h1>

            <ul className={styles['preview_head_characters']}>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["price"]}</span>
                    <span className={styles['value']}>ОТ ~3.836.000 $</span>
                </li>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["square"]}</span>
                    <span className={styles['value']}>190 кв.м2</span>
                </li>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["resident_complex"]}</span>
                    <span className={styles['value']}>Como Residences by Nakheel</span>
                </li>
                <li className={styles['characters_item']}>
                    <span className={styles['key']}>{i18n?.["characters"]?.["area"]}</span>
                    <span className={styles['value']}>Al Barsha и Barsha Heights</span>
                </li>
            </ul>

            <Button
                title={i18n?.["object"]?.["sign_up_view"]}
            />
        </div>
    );
}

export default ObjectDetailHeadInfo;
