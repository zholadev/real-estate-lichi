import React, {useMemo} from 'react';
import styles from '@/styles/ui-breadcrumbs.module.sass'
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Breadcrumbs(props) {
    const {page, i18n, theme, pageName} = props

    const breadData = useMemo(() => {
        try {
            return {
                "catalog": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["site"]?.["catalogs"],
                        "redirect": false,
                        "slash": true
                    },
                ],
                "news": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["site"]?.["news_title"],
                        "redirect": false,
                        "slash": true
                    },
                ],
                "news-id": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["site"]?.["news_title"],
                        "redirect": "/news",
                        "slash": true
                    },
                    {
                        "id": 3,
                        "name": pageName,
                        "redirect": false,
                        "slash": true
                    },
                ],
                "apartment": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["site"]?.["catalogs"],
                        "redirect": "/catalog",
                        "slash": true
                    },
                    {
                        "id": 3,
                        "name": pageName || 'burg binghatti',
                        "redirect": false,
                        "slash": true
                    },
                ],
                "residence": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["site.residence.title"],
                        "redirect": "/catalog?type=residential_complex",
                        "slash": true
                    },
                    {
                        "id": 3,
                        "name": pageName || 'burg binghatti',
                        "redirect": false,
                        "slash": true
                    },
                ],
                "about": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": i18n?.["footer"]?.["about_us_title"],
                        "redirect": false,
                        "slash": true
                    },
                ],
                "faq": [
                    {
                        "id": 1,
                        "name": i18n?.["site"]?.["main_page_title"],
                        "redirect": "/",
                    },
                    {
                        "id": 2,
                        "name": 'FAQ',
                        "redirect": false,
                        "slash": true
                    },
                ],
            }
        } catch (error) {
            console.log(`page: breadcrumbs, event: breadData, error: ${error}`)
        }
    }, [page, i18n])

    if (!page) {
        return null
    }

    return (
        <ul className={`${styles['ui_breadcrumbs']} ${theme === 'light' ? styles['ui_breadcrumbs__light'] : ''}`}>
            {
                breadData[page].map((breadItem, breadId) => {
                    return (
                        breadItem?.["redirect"] ?
                            <Link href={breadItem?.["redirect"]} key={breadId}>
                                <li className={styles['bread_item']}>
                                    {breadItem?.["slash"] && <div className={styles['item_slash']}>•</div>}
                                    <span>{breadItem?.["name"]}</span>
                                </li>
                            </Link>
                            :
                            <li className={styles['bread_item']} key={breadId}>
                                {breadItem?.["slash"] && <div className={styles['item_slash']}>•</div>}
                                <span>{breadItem?.["name"]}</span>
                            </li>
                    )
                })
            }
        </ul>
    );
}

export default Breadcrumbs;
