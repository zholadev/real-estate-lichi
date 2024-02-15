'use client'

import React from 'react';
import {StoreProvider} from "@/entities/store";
import styles from '@/styles/about-page.module.sass'
import AboutFaq from "@/components/about/ui/AboutFaq";
import AboutTopContent from "@/components/about/ui/AboutTopContent";
import {CustomerObjectContent, CustomHeaderVideo} from "@/shared/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutPage(props) {
    const {i18n} = props

    return (
        <StoreProvider>
            <section>
                <CustomHeaderVideo
                    i18n={i18n}
                    centerText={i18n?.["page.about.preview.title"]}
                    page={'about'}
                    videoSrc={'https://player.vimeo.com/progressive_redirect/playback/874039776/rendition/1080p/file.mp4?loc=external&signature=cc804aaf80eba66e6f6bbd2eed97b146920769d3d4a7d4c1fc002a1e852d0510'}
                />
                <div className={`${styles['about_page_container']} container_lg`}>
                    <AboutTopContent i18n={i18n}/>
                    <AboutFaq i18n={i18n}/>
                    <CustomerObjectContent
                        i18n={i18n}
                        col={3}
                        cardType={'primary'}
                        title={i18n?.["site"]?.["interest_for_you_title"]}
                    />
                </div>
            </section>
        </StoreProvider>
    );
}

export default AboutPage;
