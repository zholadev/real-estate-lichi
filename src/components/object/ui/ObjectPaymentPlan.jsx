'use client'

import React from 'react';
import styles from '@/styles/object-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 23.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectPaymentPlan(props) {
    const {i18n, data} = props

    if (Object.values(data || {}).length === 0) {
        return null
    }

    return (
        <div className={styles['payment_plan']}>
            <h2>{i18n?.["object.payment.plan.title"]}</h2>

            <ul className={styles['list']}>
                {
                    Object.values(data || {}).map((item, id) => {
                        return (
                            <li key={id}>
                                <h3>{item?.["name"]}</h3>
                                <p>{item?.["description"]}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default ObjectPaymentPlan;
