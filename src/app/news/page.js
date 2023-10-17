import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {NewsContainer} from "@/components/news";

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
        <div className={'container_lg page_top_size'}>
            <Breadcrumbs i18n={i18n} page={'news'} />
            <NewsContainer i18n={i18n} />
        </div>
    );
}
