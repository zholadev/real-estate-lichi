import React from 'react';
import styles from '@/styles/object-page.module.sass'
import ObjectDetailInfo from "@/components/object/ui/ObjectDetailInfo";
import ObjectDetailFeedback from "@/components/object/ui/ObjectDetailFeedback";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailDescription(props) {
    const {i18n} = props

    return (
        <div className={styles['object_description']}>
            <ObjectDetailInfo i18n={i18n} />
            <ObjectDetailFeedback i18n={i18n} />
        </div>
    );
}

export default ObjectDetailDescription;
