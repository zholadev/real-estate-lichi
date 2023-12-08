'use client'

import React from 'react';
import {Logo} from "@/shared/uikit/logo";
import FooterContact from "./FooterContact";
import FooterPageList from "./FooterPageList";
import {useParams, usePathname} from "next/navigation";
import styles from "@/styles/widget-footer.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 08.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FooterContent(props) {
    const {i18n, footerData} = props

    const pathname = usePathname()
    const routerParams = useParams()

    const footerPageListData = [
        {
            id: 1,
            title: i18n?.["footer"]?.["about_us_title"],
            link: "/about"
        }, {
            id: 2,
            title: i18n?.["footer"]?.["catalog_apartment_title"],
            link: "/catalog"
        }, {
            id: 3,
            title: i18n?.["footer"]?.["faq_title"],
            link: "/faq"
        }, {
            id: 4,
            title: i18n?.["footer"]?.["get_object_title"],
            link: "/catalog"
        }, {
            id: 5,
            title: i18n?.["footer"]?.["contact_title"],
            link: "/contact"
        },
    ]

    return (
        <footer className={styles['footer']}>
            <div
                className={`${styles['footer_content']} ${pathname == `/${routerParams['lang']}` || pathname == `/${routerParams['lang']}/catalog` || pathname == `/${routerParams['lang']}/news` || pathname == `/${routerParams['lang']}/news/${routerParams['id']}` ? 'container_md' : 'container_lg'}`}>
                <div className={styles['footer_top_content']}>
                    <div className={styles['top_content']}>
                        <Logo type={'secondary'}/>
                    </div>
                    <div className={styles['top_content']}>
                        <FooterPageList i18n={i18n} footerPageListData={footerPageListData}/>
                    </div>
                </div>
                <FooterContact i18n={i18n}/>
            </div>
        </footer>
    );
}

export default FooterContent;
