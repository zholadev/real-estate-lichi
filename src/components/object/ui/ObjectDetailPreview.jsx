import React from 'react';
import styles from '@/styles/object-page.module.sass'
import ObjectDetailGallery from "./ObjectDetailGallery";
import ObjectDetailHeadInfo from "./ObjectDetailHeadInfo";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailPreview(props) {
    const {i18n} = props

    return (
        <div className={styles['object_page_preview']}>
            <h1 className={styles['title_sm']}>2-BEDROOM (190 кв.м2)</h1>
            <ObjectDetailGallery/>
            <ObjectDetailHeadInfo i18n={i18n}/>
        </div>
    );
}

export default ObjectDetailPreview;
