import React from 'react';
import styles from '@/styles/apartments-page.module.sass'
import ApartmentAdvantagesSwiper from "@/components/apartments/ui/ApartmentAdvantagesSwiper";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentAdvantages(props) {
    const {data, i18n} = props

    return (
        <div className={styles['apartment_advantages']}>
            <div className={'container_md'}>
                <h2>Преимущества</h2>
            </div>
            <ApartmentAdvantagesSwiper/>
        </div>
    );
}

export default ApartmentAdvantages;
