import React from 'react';
import styles from '@/styles/faq-page.module.sass'
import {CustomHeaderVideo} from "@/shared/customerContent";
import FaqContent from "@/components/faq/ui/FaqContent";
import {PAGE} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FaqPageContainer(props) {
    const {i18n} = props

    return (
        <div className={`${styles['faq_page_container']}`}>
            <CustomHeaderVideo
                i18n={i18n}
                centerText={'Часто задаваемые вопросы'}
                page={'faq'}
                img={PAGE.faq.faqHeaderBg['src']}
            />
            <div className={'container_md'}>
                <FaqContent i18n={i18n}/>
            </div>
        </div>
    );
}

export default FaqPageContainer;
