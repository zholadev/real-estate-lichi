import React from 'react';
import {CustomerNewsContent} from "@/components/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MainNewsContent(props) {
    const {i18n} = props

    return (
      <CustomerNewsContent i18n={i18n} title={i18n?.["site"]?.["news_title"]}/>
    );
}

export default MainNewsContent;
