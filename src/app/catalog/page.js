import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {CatalogContainer} from "@/components/catalog";

export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return (
        <div className={"page_top_size"}>
            <div className={'container_md mb-50'}>
                <Breadcrumbs i18n={i18n} page={'catalog'}/>
            </div>
            <CatalogContainer i18n={i18n}/>
        </div>
    );
}

