import React from 'react';
import {AboutPageContainer} from "@/components/about";
import {getDictionary} from "@/dictionaries";
import {cookies} from "next/headers";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (<AboutPageContainer i18n={i18n}/>);
}
