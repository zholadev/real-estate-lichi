'use client'

import React from 'react';
import MainHeaderWelcome from "./MainHeaderWelcome";
import MainApartmentList from "./MainApartmentList";
import styles from '@/styles/main.module.sass'
import MainSearchObject from "./MainSearchObject";
import MainAboutInfo from "@/components/main/ui/MainAboutInfo";
import MainFeedback from "@/components/main/ui/MainFeedback";
import MainNewsListPreview from "@/components/main/ui/MainNewsListPreview";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainPage(props) {
    const {i18n, newsData, apartmentData, villaData} = props

    return (
        <div className={`${styles['main']} container_md`}>
            <MainHeaderWelcome i18n={i18n}/>
            <MainSearchObject i18n={i18n}/>

            <MainApartmentList
                i18n={i18n}
                title={i18n?.["site"]?.["apartment_title"]}
                col={3}
                data={apartmentData}
                url={'/catalog?filters[property_type][type]=apartment'}
            />

            <MainApartmentList
                i18n={i18n}
                title={i18n?.["site"]?.["villas_title"]}
                col={2}
                data={villaData}
                url={'/catalog?filters[property_type][type]=villa'}
            />
            <MainAboutInfo i18n={i18n}/>
            <div className={'container_md_pn'}>
                <MainFeedback i18n={i18n}/>
                <MainNewsListPreview newsData={newsData} i18n={i18n}/>
            </div>
        </div>
    );
}

export default MainPage;
