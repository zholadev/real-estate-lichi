

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {gsap} from 'gsap'
import Link from "next/link";
import {PhoneAction} from "@/shared/site";
import {IMG} from "@/shared/constants/constants";
import {ButtonArrow} from "@/shared/uikit/button";
import styles from "@/styles/widget-submenu-navbar.module.sass"
import NavbarMenuItem from "@/widgets/submenu/ui/NavbarMenuItem";
import {routerPage} from "@/entities/router/model/pages";
import useContentSize from "@/widgets/navbar/lib/useContentSize";

const animFrom = {y: 20, opacity: 0}
const reverseConfig = {y: 20, opacity: 0, duration: .1, stagger: 0.02};
const animConfig = {y: 0, opacity: 1, duration: .1, stagger: 0.02, ease: "power2.inOut"};

function gsapAnimation(ref, callback = () => {
}) {
    gsap.fromTo(ref.current.children, animFrom, {...animConfig, onComplete: callback});
}

function gsapReverseAnimation(ref, callback = () => {
}) {
    gsap.to(ref.current.children, {...reverseConfig, onComplete: callback});
}

/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NavbarSubmenu(props) {
    // props extraction
    const {
        i18n,
        active,
        toggleAnimate,
        animateTrigger,
        hideSubmenuHandle,
        showSubmenuHandle
    } = props;

    const listMenuRef = useRef(null);
    const listPageRef = useRef(null)
    const bottomActionRef = useRef(null);

    const contentIsMin = useContentSize()

    const [menuMotion, setMenuMotion] = useState(false);
    const [bottomActionMotion, setBottomActionMotion] = useState(false);

    useEffect(() => {
        if (animateTrigger) {
            showSubmenuHandle()
            gsapAnimation(listMenuRef, () => setMenuMotion(true))
        } else {
            gsapReverseAnimation(listPageRef, () => {
                setMenuMotion(false)
            });
        }
    }, [animateTrigger]);

    useEffect(() => {
        menuMotion
            ? gsapAnimation(listPageRef, () => setBottomActionMotion(true))
            : gsapReverseAnimation(listPageRef, () => {
                setBottomActionMotion(false)
                hideSubmenuHandle()
            });
    }, [menuMotion]);

    useEffect(() => {
        bottomActionMotion
            ? gsapAnimation(bottomActionRef)
            : gsapReverseAnimation(bottomActionRef);
    }, [bottomActionMotion]);

    const menuList = useMemo(() => (
        [
            {
                id: 1,
                title: i18n?.["footer"]?.["catalog_apartment_title"],
                img: IMG.templateCatalogCard['src'],
                url: routerPage.catalog
            },
            {
                id: 2,
                title: i18n?.["site.residence.title"],
                img: IMG.templateCatalogCard['src'],
                url: `${routerPage.catalog}?type=residential_complex`
            },
            {
                id: 3,
                title: i18n?.["site"]?.["apartment_title"],
                img: IMG.templateCatalogCard['src'],
                url: `${routerPage.catalog}?filters[property_types][type]=apartment`
            },
        ]
    ), [i18n]);

    return (
        <div
            className={`${styles['navbar_submenu']} ${!contentIsMin ? styles['submenu_full_wd'] : ''} ${active ? styles['navbar_submenu__active'] : ''}`}>
            <div className={styles['navbar_content']}>
                <div className={styles['main_content']}>
                    <div className={styles['menu_content']}>
                        <ul className={styles['menu_list']} ref={listMenuRef}>
                            {
                                menuList.map((item, id) => {
                                    return (
                                        <NavbarMenuItem onClick={toggleAnimate} item={item} key={id}/>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className={styles['page_content']}>
                        <ul className={styles['menu_list']} ref={listPageRef}>
                            <li className={styles['list_item']} onClick={toggleAnimate}>
                                <Link href={routerPage.about}>
                                    {i18n?.["footer"]?.["about_us_title"]}
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggleAnimate}>
                                <Link href={routerPage.faq}>
                                    {i18n?.["footer"]?.["faq_title"]}
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggleAnimate}>
                                <Link href={routerPage.news}>
                                    {i18n?.["site"]?.["news_title"]}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles['footer_content']}>
                    <div className={styles['footer_box']} ref={bottomActionRef}>
                        <ButtonArrow
                            theme={'light'}
                            onClick={toggleAnimate}
                            url={routerPage.catalog}
                            title={i18n?.["site"]?.["get_object"]}
                        />

                        <div className={styles['action_content']} onClick={toggleAnimate}>
                            <PhoneAction
                                i18n={i18n}
                                themePhone={'light'}
                                themeLocal={'light'}
                                phoneOnClick={toggleAnimate}
                                localOnClick={toggleAnimate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarSubmenu;
