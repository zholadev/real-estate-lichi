import React from 'react';
import {AboutPageContainer} from "@/components/about";
import {getDictionary} from "@/dictionaries";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return (<AboutPageContainer i18n={i18n}/>);
}
