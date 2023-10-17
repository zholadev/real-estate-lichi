import React from 'react';
import {PageMapInfo} from "@/shared/uikit/map";
import ApartmentHeader from "./ApartmentHeader";
import ApartmentAdvantages from "./ApartmentAdvantages";
import styles from '@/styles/apartments-page.module.sass'
import ApartmentAboutProject from "./ApartmentAboutProject";
import ApartmentDesignGallery from "./ApartmentDesignGallery";
import {CustomerObjectContent} from "@/components/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentsPageContainer(props) {
    const {i18n} = props

    return (
        <div className={styles['apartments_container']}>
            <ApartmentHeader
                i18n={i18n}
                videoSrc={'https://player.vimeo.com/progressive_redirect/playback/874470463/rendition/1080p/file.mp4?loc=external&signature=c4523c43201260fa4ee74e0ba437aea97058fba33ed52acf1a9cb22b1e6dc93e'}
                title={'Burg Binghatti'}
                description={'Стремясь к звездам, Binghatti x Jacob & Co. запускают продажи самого высокого жилого небоскреба в мире из всех когда-либо построенных, где уже приобрели себе пентхаусы первые лица Саудии и ОАЭ!'}
            />
            <div className={'container_md'}>
                <ApartmentAboutProject i18n={i18n}/>
            </div>

            <ApartmentAdvantages i18n={i18n} />

            <div className={'container_md'}>
                <PageMapInfo i18n={i18n}/>
                <ApartmentDesignGallery i18n={i18n} />
                <CustomerObjectContent
                    title={'Цены и планировки'}
                    container={'container_md_pn'}
                    button
                    buttonTitle={i18n?.["site"]?.["see_more"]}
                />
            </div>
        </div>
    );
}

export default ApartmentsPageContainer;
