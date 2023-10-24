import React, {useMemo} from 'react';
import styles from "@/styles/widget-submenu-navbar.module.sass"
import {Logo} from "@/shared/uikit/logo";
import {IMG} from "@/shared/constants/constants";
import Link from "next/link";
import {ButtonArrow} from "@/shared/uikit/button";
import {PhoneAction} from "@/shared/site";


/**
 * @author Zholaman Zhumanov
 * @created 16.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NavbarSubmenu(props) {
    const {i18n, active, toggle} = props

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
        <div className={`${styles['navbar_submenu']} ${active ? styles['navbar_submenu__active'] : ''}`}>
            <div className={styles['navbar_bg']}>
                <div className={styles['bg_img']}/>
            </div>
            <i className={styles['menu_closed']} onClick={toggle}/>

            <div className={styles['navbar_content']}>
                <div className={styles['main_content']}>
                    <div className={styles['top_content']}>
                        <Logo theme={'light'} onClick={toggle} type={'secondary'}/>
                    </div>

                    <div className={styles['menu_content']}>
                        <ul className={styles['menu_list']}>
                            {
                                menuList.map((item, id) => {
                                    return (
                                        <div key={id} onClick={toggle}>
                                            <li className={styles['list_item']}>
                                                <Link href={item.url}>
                                                    <div className={styles['title']}>{item.title}</div>
                                                </Link>

                                            </li>
                                            <div className={styles['img_preview']}>
                                                <div className={styles['preview_overlay']}></div>
                                                <img src={item.img} alt=""/>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className={styles['page_content']}>
                        <ul className={styles['menu_list']}>
                            <li className={styles['list_item']} onClick={toggle}>
                                <Link href={'/about'}>
                                    О нас
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggle}>
                                <Link href={'/faq'}>
                                    FAQ
                                </Link>
                            </li>
                            <li className={styles['list_item']} onClick={toggle}>
                                <Link href={'/news'}>
                                    Новости
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles['footer_content']}>
                    <ButtonArrow
                        title={'Подобрать объект'}
                        url={'/catalog'}
                        onClick={toggle}
                    />

                    <div className={styles['action_content']} onClick={toggle}>
                        <PhoneAction
                            i18n={i18n}
                            themePhone={'light'}
                            themeLocal={'light'}
                            phoneOnClick={toggle}
                            localOnClick={toggle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarSubmenu;
