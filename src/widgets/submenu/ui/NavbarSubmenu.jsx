'use client'

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {gsap} from 'gsap'
import Link from "next/link";
import {PhoneAction} from "@/shared/site";
import {IMG} from "@/shared/constants/constants";
import {ButtonArrow} from "@/shared/uikit/button";
import styles from "@/styles/widget-submenu-navbar.module.sass"
import NavbarMenuItem from "@/widgets/submenu/ui/NavbarMenuItem";

// TODO: Refactoring

/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NavbarSubmenu(props) {
    const {i18n, active, toggleAnimate, toggleMenu, animateTrigger, showSubmenuHandle, hideSubmenuHandle, fullWidth} = props

    const listMenuRef = useRef(null);
    const listPageRef = useRef(null)

    const bottomActionRef = useRef(null)

    const [menuMotion, setMenuMotion] = useState(false)
    const [bottomActionMotion, setBottomActionMotion] = useState(false)

    const animateMenuList = () => {
        gsap.fromTo(
            listMenuRef.current.children,
            {y: 20, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: .2,
                ease: "power2.inOut",
                onComplete: () => setMenuMotion(true)
            }
        );
    };

    const animatePageList = () => {
        gsap.fromTo(
            listPageRef.current.children,
            {y: 20, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: .2,
                ease: "power2.inOut",
                onComplete: () => setBottomActionMotion(true)
            }
        );
    }

    const animateBottomAction = () => {
        gsap.fromTo(
            bottomActionRef.current.children,
            {y: 20, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: .2,
                ease: "power2.inOut"
            }
        );
    }


    const reverseListAnimation = () => {
        gsap.to(listMenuRef.current.children, {
            y: 20,
            opacity: 0,
            duration: .2,
            onComplete: () => setMenuMotion(false)
        });
    };

    const reversePageListAnimation = () => {
        gsap.to(listPageRef.current.children, {
            y: 20,
            opacity: 0,
            duration: .2,
            onComplete: () => setBottomActionMotion(false)
        });
    }

    const reverseBottomActionAnimation = () => {
        gsap.to(bottomActionRef.current.children, {
            y: 20,
            opacity: 0,
            duration: .2,
            onComplete: () => {
                hideSubmenuHandle()
            }
        });
    }


    useEffect(() => {
        if (animateTrigger) {
            showSubmenuHandle()
            animateMenuList();
        } else {
            reverseListAnimation();
        }
    }, [animateTrigger]);

    useEffect(() => {
        if (menuMotion) {
            animatePageList()
        } else {
            reversePageListAnimation()
        }
    }, [menuMotion]);

    useEffect(() => {
        if (bottomActionMotion) {
            animateBottomAction()
        } else {
            reverseBottomActionAnimation()
        }
    }, [bottomActionMotion]);

    const menuList = useMemo(() => {
        return [
            {
                id: 1,
                title: "Каталог недвижимости",
                img: IMG.templateCatalogCard['src'],
                url: "/catalog"
            },
            {
                id: 1,
                title: "Жилые комплексы",
                img: IMG.templateCatalogCard['src'],
                url: "/catalog"
            },
            {
                id: 1,
                title: "Контакты",
                img: IMG.templateCatalogCard['src'],
                url: "/catalog"
            },
        ]
    }, [])

    return (
        <div className={`${styles['navbar_submenu']} ${fullWidth  ? styles['submenu_full_wd'] : ''} ${active ? styles['navbar_submenu__active'] : ''}`}>
            {/*<i className={styles['menu_closed']} onClick={toggleAnimate}/>*/}

            <div className={styles['navbar_content']}>
                <div className={styles['main_content']}>
                    <div className={styles['top_content']}>
                        {/*<Logo theme={'light'} onClick={toggle} type={'secondary'}/>*/}
                    </div>

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
                                <Link href={'/about'}>
                                    О нас
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggleAnimate}>
                                <Link href={'/faq'}>
                                    FAQ
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggleAnimate}>
                                <Link href={'/news'}>
                                    Новости
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles['footer_content']}>
                   <div className={styles['footer_box']} ref={bottomActionRef}>
                       <ButtonArrow
                           title={'Подобрать объект'}
                           url={'/catalog'}
                           onClick={toggleAnimate}
                           theme={'light'}
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
