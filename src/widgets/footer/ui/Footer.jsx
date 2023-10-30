'use client'

import React, {useMemo} from 'react';
import {Logo} from "@/shared/uikit/logo";
import FooterContact from "./FooterContact";
import FooterPageList from "./FooterPageList";
import styles from '@/styles/widget-footer.module.sass'
import {usePathname} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Footer(props) {
    const {i18n, footerData} = props

    const pathname = usePathname()

    const footerPageListData = useMemo(() => {
        try {
            return [
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
        } catch (error) {
            console.log(`page: footer, event: footerPageListData, error: ${error}`)
        }
    }, [i18n])

    return (
        <footer className={styles['footer']}>
            <div className={`${styles['footer_content']} ${pathname === '/catalog/apartment' || pathname === '/catalog/object' || pathname === '/about' || pathname === '/faq' ? 'container_lg' : 'container_md'}`}>
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

export default Footer;
