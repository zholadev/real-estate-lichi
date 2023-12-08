'use client'

import React from 'react';
import styles from '@/styles/apartments-page.module.sass'
import ResidenceAdvantagesSwiper from "@/components/residence/ui/ResidenceAdvantagesSwiper";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceAdvantages(props) {
    const {data, i18n} = props

    return (
        <div className={styles['apartment_advantages']}>
            <div className={'container_md'}>
                <h2>{i18n?.["site.advantages.title"]}</h2>
            </div>
            <ResidenceAdvantagesSwiper data={data}/>
        </div>
    );
}

export default ResidenceAdvantages;
