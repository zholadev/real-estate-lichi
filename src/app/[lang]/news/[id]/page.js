import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {NewsPageDetail} from "@/components/news";
import {Breadcrumbs} from "src/entities/breadcrumbs";
import {CustomerNewsContent} from "src/shared/customerContent";
import {apiGetNewsByIdData} from "@/shared/services/clientRequests";
import {extractAttribute} from "@/shared/utilites";

async function getNewsByIdData(id) {
    return apiGetNewsByIdData(id, {
        "fields[0]": "title",
        "fields[1]": "content",
        "fields[2]": "date",
        "populate": "images,more_interestings.images,tags"
    })
}

async function Page({params}) {
    const newsDataDetail = await getNewsByIdData(params.id)

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    const newsData = newsDataDetail?.["data"]?.["data"]

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs
                i18n={i18n}
                page={'news-id'}
                pageName={extractAttribute("title", newsData)}
            />
            <NewsPageDetail
                id={params.id}
                i18n={i18n}
                newsData={newsData}
            />
            <CustomerNewsContent
                btnOff
                i18n={i18n}
                title={i18n?.["news"]?.["news_recommend_title"]}
                newsData={extractAttribute("more_interestings.data", newsData)}
            />
        </div>
    );
}

export default Page;
