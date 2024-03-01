

import React from 'react';
import About from "../about/About";
import Header from "../header/Header";
import Feedback from "../feedback/Feedback";
import styles from '@/styles/main.module.sass'
import FilterSearch from "../filterSearch/FilterSearch";
import PropertyList from "../propertyList/PropertyList";
import ResidenceList from "../residenceList/ResidenceList";
import NewsRecommendation from "../news/NewsRecommendation";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainPage(props) {
    const {i18n, newsData, apartmentData, villaData, residenceData} = props

    return (
        <div className={`${styles['main']} container_md`}>
            <Header
                i18n={i18n}
                residenceData={residenceData}
            />

            <ResidenceList
                i18n={i18n}
                data={residenceData}
            />

            <FilterSearch i18n={i18n}/>

            <PropertyList
                i18n={i18n}
                title={i18n?.["site"]?.["apartment_title"]}
                col={3}
                data={apartmentData}
                url={'/catalog?filters[property_types][type]=apartment'}
            />

            <PropertyList
                i18n={i18n}
                title={i18n?.["site"]?.["villas_title"]}
                col={2}
                data={villaData}
                url={'/catalog?filters[property_types][type]=villa'}
            />

            <About i18n={i18n}/>

            <div className={'container_md_pn'}>
                <Feedback i18n={i18n}/>
                <NewsRecommendation newsData={newsData} i18n={i18n}/>
            </div>
        </div>
    );
}

export default MainPage;
