'use client'

import React, {useMemo, useState} from 'react';
import styles from '@/styles/apartments-page.module.sass'
import {Tabs} from "@/shared/uikit/tabs";
import ResidenceDesignSwiper from "@/components/residence/ui/ResidenceDesignSwiper";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceDesignGallery(props) {
    const {i18n, interiorData} = props

    const [typeContent, setTypeContent] = useState('interior')

    return (
        <div className={styles['apartment_design_gallery']}>
            <Tabs
                tabData={interiorData}
                item={"name"}
                activeSelectName={"name"}
                onClick={setTypeContent}
            />

            <div className={styles['design_gallery_content']}>
                {
                    Object.values(interiorData || {}).map((item, id) => {
                        return (
                            typeContent === item?.["name"] && <ResidenceDesignSwiper key={id} i18n={i18n} info={item}/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ResidenceDesignGallery;
