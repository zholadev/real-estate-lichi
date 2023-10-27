import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {NewsPageDetail} from "@/components/news";
import {CustomerNewsContent} from "@/components/customerContent";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs i18n={i18n} page={'news-id'}/>
            <NewsPageDetail detailData={[]} i18n={i18n}/>
            <CustomerNewsContent btnOff i18n={i18n} title={i18n?.["news"]?.["news_recommend_title"]} />
        </div>
    );
}
