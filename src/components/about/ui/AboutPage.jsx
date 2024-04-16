import React from 'react';
import {VIDEO} from "@/shared/constants/constants";
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
        <section>
            <CustomHeaderVideo
                i18n={i18n}
                centerText={i18n?.["page.about.preview.title"]}
                page={'about'}
                videoSrc={VIDEO.about}
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
    );
}

export default AboutPage;
