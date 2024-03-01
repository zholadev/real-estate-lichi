import React from 'react';
import {NewsPageDetail} from "@/components/news";
import {Breadcrumbs} from "@/entities/breadcrumbs";
import {extractAttribute} from "@/shared/utilites";
import {globalProps} from "@/entities/globalProps";
import {CustomerNewsContent} from "@/shared/customerContent";
import {apiGetNewsByIdData} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Index(props) {
    const {id, i18n, newsDataDetail} = props

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs
                i18n={i18n}
                page={'news-id'}
                pageName={extractAttribute("title", newsDataDetail)}
            />
            <NewsPageDetail
                id={id}
                i18n={i18n}
                newsData={newsDataDetail}
            />
            <CustomerNewsContent
                btnOff
                i18n={i18n}
                title={i18n?.["news"]?.["news_recommend_title"]}
                newsData={extractAttribute("more_interestings.data", newsDataDetail)}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const newsDataDetail = await apiGetNewsByIdData(context.query.id, {
            "fields[0]": "title",
            "fields[1]": "content",
            "fields[2]": "date",
            "populate": "images,more_interestings.images,tags"
        })

        const data = newsDataDetail?.["data"]

        if (data?.error?.status === 404 || !data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                newsDataDetail: data || {},
                id: context.query.id,
                ...await globalProps(context)
            }
        }
    } catch (error) {
        console.log("An error has occurred")
    }
}


export default Index;
