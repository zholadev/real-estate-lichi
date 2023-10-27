'use client'

import React from 'react';
import styles from '@/styles/main.module.sass'
import MainPreview from "./MainPreview";
import MainFormInvesting from "./MainFormInvesting";
import MainApartment from "./MainApartment";
import MainAboutUs from "@/components/main/ui/MainAboutUs";
import MainConsultation from "@/components/main/ui/MainConsultation";
import MainNewsContent from "@/components/main/ui/MainNewsContent";
import {useWindowScroll} from "@uidotdev/usehooks";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainContainer(props) {
    const {i18n} = props
    const [{y}] = useWindowScroll();

    console.log(y)

    return (
        <div className={`${styles['main']} container_md`}>
            <MainPreview i18n={i18n}/>
            <MainFormInvesting i18n={i18n}/>
            <MainApartment i18n={i18n} title={i18n?.["site"]?.["apartment_title"]} col={3}/>
            <MainApartment i18n={i18n} title={i18n?.["site"]?.["villas_title"]} col={2}/>
            <MainAboutUs i18n={i18n}/>
            <div className={'container_md_pn'}>
                <MainConsultation i18n={i18n}/>
                <MainNewsContent i18n={i18n} />
            </div>
        </div>
    );
}

export default MainContainer;
