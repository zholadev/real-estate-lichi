import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {PageMapInfo} from "@/shared/uikit/map";
import {TagListSecondary} from "@/shared/uikit/tags";
import {ObjectDetailDescription, ObjectDetailPreview, ObjectLayout} from "@/components/object";

const cityList = [
    {
        id: 1,
        title: "высокая доходность"
    }, {
        id: 2,
        title: "экологичен"
    }, {
        id: 3,
        title: "закрытая территория"
    }, {
        id: 4,
        title: "круглосуточная охрана"
    }, {
        id: 5,
        title: "детские площадки"
    }, {
        id: 6,
        title: "бассейн"
    },
    {
        id: 6,
        title: "подземная парковка"
    },
]

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Promise<Element>}
 * @constructor
 */
export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return (
        <div className={'container_md page_top_size'}>
            <Breadcrumbs i18n={i18n} page={'apartment'}/>
            <ObjectDetailPreview i18n={i18n}/>
            <TagListSecondary listTags={cityList} style={{marginBottom: "120px"}}/>
            <ObjectDetailDescription i18n={i18n}/>
            <ObjectLayout i18n={i18n}/>
            <PageMapInfo i18n={i18n}/>
        </div>
    );
}
