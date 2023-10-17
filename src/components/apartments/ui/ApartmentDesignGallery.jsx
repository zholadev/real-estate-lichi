'use client'

import React, {useMemo, useState} from 'react';
import styles from '@/styles/apartments-page.module.sass'
import {Tabs} from "@/shared/uikit/tabs";
import {IMG} from "@/shared/constants/constants";
import ApartmentDesignSwiper from "@/components/apartments/ui/ApartmentDesignSwiper";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentDesignGallery(props) {
    const {interiorData, exteriorData, i18n} = props

    const [typeContent, setTypeContent] = useState('interior')

    const tabData = useMemo(() => {
        try {
            return [
                {
                    id: 1,
                    value: "interior",
                    title: "Интерьер"
                },
                {
                    id: 2,
                    value: "exterior",
                    title: "Экстерьер"
                },
            ]
        } catch (error) {
            console.log(`page: catalog, event: tabData, error: ${error}`)
        }
    }, [i18n])

    const sliderContent = useMemo(() => {
        return [
            {
                id: 1,
                img: IMG.templateDesignApartment['src']
            },
            {
                id: 2,
                img: IMG.templateDesignApartment['src']
            },
            {
                id: 3,
                img: IMG.templateDesignApartment['src']
            },
            {
                id: 4,
                img: IMG.templateDesignApartment['src']
            },
            {
                id: 5,
                img: IMG.templateDesignApartment['src']
            }]
    }, [IMG])

    return (
        <div className={styles['apartment_design_gallery']}>
            <Tabs tabData={tabData} onClick={setTypeContent}/>

            <div className={styles['design_gallery_content']}>
                {
                    typeContent === 'exterior' ?
                        <ApartmentDesignSwiper i18n={i18n} sliderContent={sliderContent}/>
                        :
                        <ApartmentDesignSwiper i18n={i18n} sliderContent={sliderContent}/>
                }
            </div>
        </div>
    );
}

export default ApartmentDesignGallery;
