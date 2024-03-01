import React from 'react';
import {NewsContainer} from "@/components/news";
import {globalGetTranslate} from "@/entities/i18n";
import {Breadcrumbs} from "@/entities/breadcrumbs";
import {apiGetNewsData} from "@/shared/services/clientRequests";
import {globalProps} from "@/entities/globalProps";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default function Index(props) {
    const {newsData, i18n} = props

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs i18n={i18n} page={'news'}/>
            <NewsContainer
                i18n={i18n}
                newsData={newsData?.["data"]}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const newsData = await apiGetNewsData(10, 1, {
        "fields[0]": "title",
        "fields[1]": "short_description",
        "populate": "images"
    })
    return {
        props: {
            newsData: newsData || {},
            ...await globalProps(context)
        }
    }
}
