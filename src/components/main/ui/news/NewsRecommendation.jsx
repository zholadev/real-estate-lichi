

import React from 'react';
import {CustomerNewsContent} from "@/shared/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NewsRecommendation(props) {
    const {i18n, newsData = []} = props

    return (
        Object.values(newsData || {}).length > 0 &&
        <CustomerNewsContent
            i18n={i18n}
            newsData={newsData}
            title={i18n?.["site"]?.["news_title"]}
        />
    );
}

export default NewsRecommendation;
