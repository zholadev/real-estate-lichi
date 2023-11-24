import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {NewsContainer} from "@/components/news";
import {apiGetNewsData} from "@/shared/services/clientRequests";
import {cookies} from "next/headers";


async function getNewsData() {
    return apiGetNewsData()
}

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const newsData = await getNewsData()

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs i18n={i18n} page={'news'} />
            <NewsContainer i18n={i18n} newsData={newsData?.["data"]?.["data"]}/>
        </div>
    );
}

