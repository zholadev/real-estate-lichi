import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {NewsPageDetail} from "@/components/news";
import {CustomerNewsContent} from "@/components/customerContent";
import {apiGetNewsByIdData} from "@/shared/services/clientRequests";
import {cookies} from "next/headers";

async function getNewsByIdData(id) {
    return apiGetNewsByIdData(id)
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
