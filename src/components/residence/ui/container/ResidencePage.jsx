'use client'

import React, {useMemo} from 'react';
import qs from "qs";
import ResidenceHeader from "../ResidenceHeader";
import {AttractionsLocation} from "@/shared/uikit/map";
import {mediaImgSrc} from "@/shared/constants/options";
import ResidenceAdvantages from "../ResidenceAdvantages";
import styles from '@/styles/apartments-page.module.sass'
import ResidenceAboutProject from "../ResidenceAboutProject";
import ResidenceDesignGallery from "../ResidenceDesignGallery";
import {CustomerObjectContent} from "@/shared/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidencePage(props) {
    const {i18n, residenceData} = props

    const data = useMemo(() => {
        return {
            "id": residenceData?.["id"],
            "name": residenceData?.["attributes"]?.["name"],
            "locate": residenceData?.["attributes"]?.["locate"],
            "about_project": residenceData?.["attributes"]?.["about_project"],
            "attractions": residenceData?.["attributes"]?.["attractions"]?.["data"],
            "apartments": residenceData?.["attributes"]?.["apartments"]?.["data"] || [],
            "interior_description": residenceData?.["attributes"]?.["interior_description"],
            "gallery_photos": residenceData?.["attributes"]?.["photos"]?.["item"]?.["data"],
            "videoSrc": residenceData?.["attributes"]?.["videos"]?.["item"]?.["data"]?.[0]?.["attributes"]?.["url"] || "",
            "poster": residenceData?.["attributes"]?.["video_posters"]?.["item"]?.["data"]?.["attributes"]?.["url"] || "",
        }
    }, [residenceData])

    return (
        <section className={styles['apartments_container']}>
            <ResidenceHeader
                i18n={i18n}
                title={data?.["name"]}
                poster={mediaImgSrc(data?.["poster"])}
                videoSrc={mediaImgSrc(data?.["videoSrc"])}
                description={residenceData?.["attributes"]?.["description"]}
            />

            <div className={'container_md'}>
                <ResidenceAboutProject
                    i18n={i18n}
                    data={data?.["about_project"]}
                />
            </div>

            <ResidenceAdvantages
                i18n={i18n}
                data={data?.["gallery_photos"]}
            />

            <AttractionsLocation
                cluster
                isPopup
                i18n={i18n}
                sliderCardCountView={6.2}
                currentData={data?.["locate"]}
                attractionsData={data?.["attractions"]}
            />

            <div className={'container_md'}>
                <ResidenceDesignGallery
                    i18n={i18n}
                    data={data?.["interior_description"]}
                />

                {
                    Object.values(data?.["apartments"] || {}).length > 0 &&
                    <CustomerObjectContent
                        button
                        data={data?.["apartments"]}
                        container={'container_md_pn'}
                        buttonTitle={i18n?.["site"]?.["see_more"]}
                        title={i18n?.["residence.more.interesting.title"]}
                        redirectTo={`/catalog?${qs.stringify({
                            filters: {
                                "residence": {
                                    "name": {
                                        "$contains": residenceData?.["attributes"]?.["name"]
                                    }
                                }
                            }
                        })}`}
                    />
                }
            </div>
        </section>
    );
}

export default ResidencePage;
