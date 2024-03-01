

import React from 'react';
import Link from "next/link";
import stylesTag from '@/styles/main.module.sass'
import styles from '@/styles/object-page.module.sass'
import DetailGallery from "./DetailGallery";
import ObjectDetailHeadInfo from "./ObjectDetailHeadInfo";
import {routerPage} from "@/entities/router/model/pages";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @last-updated 09.01.2024
 * @update-description tag list add router link and minor refactoring
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailPreview(props) {
    const {i18n, data = {}} = props

    function renderTagsList(tagsData) {
        return Object.values(tagsData).map((tag, index) => (
            <li key={index} className={stylesTag['list_item']}>
                <Link href={`${routerPage.catalog}?filters[tags][type]=${tag?.attributes?.type}`}>
                    {tag?.attributes?.name ?? ""}
                </Link>
            </li>
        ));
    }

    return (
        <>
            <div className={styles['object_page_preview']}>
                <h1 className={styles['title_sm']}>{data?.name}</h1>
                <DetailGallery
                    galleryImages={data?.photos ?? []}
                    name={data?.name}
                />
                <ObjectDetailHeadInfo
                    i18n={i18n}
                    data={data}
                />
            </div>

            <div className={'container_md'}>
                <ul className={stylesTag['main_bottom_list']} style={{marginBottom: "120px"}}>
                    {data?.tags && renderTagsList(data.tags)}
                </ul>
            </div>
        </>

    );
}

export default ObjectDetailPreview;
