import React from 'react';
import {getDictionary} from "@/dictionaries";
import {FaqPageContainer} from "@/components/faq";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return <FaqPageContainer i18n={i18n} />
}

