'use client'

import React, {useEffect} from 'react';
import styles from '@/styles/main.module.sass'
import MainPreview from "./MainPreview";
import MainFormInvesting from "./MainFormInvesting";
import MainApartment from "./MainApartment";
import MainAboutUs from "@/components/main/ui/MainAboutUs";
import MainConsultation from "@/components/main/ui/MainConsultation";
import MainNewsContent from "@/components/main/ui/MainNewsContent";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainContainer(props) {
    const {i18n, newsData, apartmentData, villaData} = props

    return (
        <div className={`${styles['main']} container_md`}>
            <MainPreview i18n={i18n}/>
            <MainFormInvesting i18n={i18n}/>
            <MainApartment
                i18n={i18n}
                title={i18n?.["site"]?.["apartment_title"]}
                col={3}
                data={apartmentData}
                url={'/catalog?filters[property_type][type]=apartment'}
            />

            <MainApartment
                i18n={i18n}
                title={i18n?.["site"]?.["villas_title"]}
                col={2}
                data={villaData}
                url={'/catalog?filters[property_type][type]=villa'}
            />
            <MainAboutUs i18n={i18n}/>
            <div className={'container_md_pn'}>
                <MainConsultation i18n={i18n}/>
                <MainNewsContent newsData={newsData} i18n={i18n}/>
            </div>
        </div>
    );
}

export default MainContainer;
