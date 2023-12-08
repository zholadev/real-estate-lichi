import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {NewsPageDetail} from "@/components/news";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {CustomerNewsContent} from "@/components/customerContent";
import {apiGetNewsByIdData} from "@/shared/services/clientRequests";

async function getNewsByIdData(id) {
    return apiGetNewsByIdData(id, {
        "fields[0]": "title",
        "fields[1]": "content",
        "fields[2]": "date",
        "populate": "images,more_interestings.images"
    })
}

async function Page({params}) {
    const newsDataDetail = await getNewsByIdData(params.id)

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs
                i18n={i18n}
                page={'news-id'}
                pageName={newsDataDetail?.["data"]?.["data"]?.["attributes"]?.["title"]}
            />
            <NewsPageDetail
                id={params.id}
                i18n={i18n}
                newsData={newsDataDetail?.["data"]?.["data"]}
            />
            <CustomerNewsContent
                btnOff
                i18n={i18n}
                title={i18n?.["news"]?.["news_recommend_title"]}
                newsData={newsDataDetail?.["data"]?.["data"]?.["attributes"]?.["more_interestings"]?.["data"]}
            />
        </div>
    );
}

export default Page;
