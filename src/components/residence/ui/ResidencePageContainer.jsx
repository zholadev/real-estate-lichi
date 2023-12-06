'use client'

import React from 'react';
import {PageMapInfo} from "@/shared/uikit/map";
import ResidenceHeader from "./ResidenceHeader";
import {mediaImgSrc} from "@/shared/constants/options";
import ResidenceAdvantages from "./ResidenceAdvantages";
import styles from '@/styles/apartments-page.module.sass'
import ResidenceAboutProject from "./ResidenceAboutProject";
import ResidenceDesignGallery from "./ResidenceDesignGallery";
import {CustomerObjectContent} from "@/components/customerContent";
import qs from "qs";


/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidencePageContainer(props) {
    const {i18n, residenceData} = props

    return (
        <section className={styles['apartments_container']}>
            <ResidenceHeader
                i18n={i18n}
                videoSrc={mediaImgSrc(residenceData?.["attributes"]?.["videos"]?.["item"]?.["data"]?.[0]?.["attributes"]?.["url"])}
                title={residenceData?.["attributes"]?.["name"]}
                poster={mediaImgSrc(residenceData?.["attributes"]?.["video_posters"]?.["item"]?.["data"]?.["attributes"]?.["url"])}
                description={residenceData?.["attributes"]?.["description"]}
            />
            <div className={'container_md'}>
                <ResidenceAboutProject
                    i18n={i18n}
                    description={residenceData?.["attributes"]?.["about_project"]}
                />
            </div>

            <ResidenceAdvantages
                i18n={i18n}
                galleryImages={residenceData?.["attributes"]?.["photos"]?.["item"]?.["data"]}
            />

            <div className={'container_md'}>
                <PageMapInfo
                    i18n={i18n}
                    zoom={20}
                    mapInfo={residenceData?.["attributes"]?.["attractions"]?.["data"]}
                    mapInfoList={residenceData?.["attributes"]?.["attractions"]?.["data"]}
                />
                <ResidenceDesignGallery
                    interiorData={residenceData?.["attributes"]?.["interior_description"]}
                    i18n={i18n}
                />

                {
                    Object.values(residenceData?.["attributes"]?.["apartments"]?.["data"] || {}).length > 0 &&
                    <CustomerObjectContent
                        title={i18n?.["residence.more.interesting.title"]}
                        container={'container_md_pn'}
                        button
                        redirectTo={`/catalog?${qs.stringify({
                            filters:  {
                                "residence": {
                                    "name": {
                                        "$contains": residenceData?.["attributes"]?.["name"]
                                    }
                                }
                            }
                        })}`}
                        buttonTitle={i18n?.["site"]?.["see_more"]}
                        data={residenceData?.["attributes"]?.["apartments"]?.["data"]}
                    />
                }
            </div>
        </section>
    );
}

export default ResidencePageContainer;
