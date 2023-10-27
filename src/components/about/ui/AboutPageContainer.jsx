import React from 'react';
import styles from '@/styles/about-page.module.sass'
import {CustomerObjectContent, CustomHeaderVideo} from "@/components/customerContent";
import AboutTopContent from "@/components/about/ui/AboutTopContent";
import AboutFaq from "@/components/about/ui/AboutFaq";
import {IMG} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AboutPageContainer(props) {
    const {i18n} = props

    return (
        <>
            <CustomHeaderVideo
                i18n={i18n}
                centerText={'Вся жилая и коммерческая недвижимость в одном месте'}
                page={'about'}
                videoSrc={'https://player.vimeo.com/progressive_redirect/playback/874039776/rendition/1080p/file.mp4?loc=external&signature=cc804aaf80eba66e6f6bbd2eed97b146920769d3d4a7d4c1fc002a1e852d0510'}
                poster={IMG.posterAboutPage['src']}
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
        </>
    );
}

export default AboutPageContainer;
