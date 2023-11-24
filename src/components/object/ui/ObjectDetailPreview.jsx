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
    const {i18n, apartmentData} = props

    return (
        <>
            <div className={styles['object_page_preview']}>
                <h1 className={styles['title_sm']}>{apartmentData?.["data"]?.["data"]?.["attributes"]?.["name"]}</h1>
                <ObjectDetailGallery
                    galleryImages={apartmentData?.["data"]?.["data"]?.["attributes"]?.["photos"] ?? []}
                    name={apartmentData?.["data"]?.["data"]?.["attributes"]?.["name"]}
                />
                <ObjectDetailHeadInfo i18n={i18n} apartmentInfoData={apartmentData?.["data"]?.["data"]?.["attributes"]}/>
            </div>
            <div className={'container_md'}>
                <ul className={stylesTag['main_bottom_list']} style={{marginBottom: "120px"}}>
                    {
                        Object.values(apartmentData?.["data"]?.["data"]?.["attributes"]?.["tags"]?.["data"] || {}).map((item, Id) => {
                            return (
                                <li key={item?.["id"]}
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
