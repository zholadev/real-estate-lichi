import React from 'react';
import styles from '@/styles/object-page.module.sass'
import stylesTag from '@/styles/main.module.sass'
import ObjectDetailGallery from "./ObjectDetailGallery";
import ObjectDetailHeadInfo from "./ObjectDetailHeadInfo";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailPreview(props) {
    const {i18n, data} = props

    return (
        <>
            <div className={styles['object_page_preview']}>
                <h1 className={styles['title_sm']}>{data?.["name"]}</h1>
                <ObjectDetailGallery
                    galleryImages={data?.["photos"] ?? []}
                    name={data?.["name"]}
                />
                <ObjectDetailHeadInfo
                    i18n={i18n}
                    data={data}
                />
            </div>

            <div className={'container_md'}>
                <ul className={stylesTag['main_bottom_list']} style={{marginBottom: "120px"}}>
                    {
                        Object.values(data?.["tags"] || {}).map((item, Id) => {
                            return (
                                <li
                                    key={Id}
                                    className={stylesTag['list_item']}
                                >
                                    {item?.["attributes"]?.["name"] ?? ""}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>

    );
}

export default ObjectDetailPreview;
