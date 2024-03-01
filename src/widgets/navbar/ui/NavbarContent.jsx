

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap"
import Cookies from "js-cookie";
import {Logo} from "@/shared/uikit/logo";
import {PhoneAction} from "@/shared/site";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import styles from "@/styles/navbar.module.sass";
import {useMediaMaxState, useScrollAction} from "@/shared/hooks";
import stylesSecondary from "@/styles/widget-submenu-navbar.module.sass";
import useContentSize from "@/widgets/navbar/lib/useContentSize";
import {cookiesName} from "@/shared/constants/options";

/**
 * @author Zholaman Zhumanov
 * @last-updated 16.01.2024 - Zholaman Zhumanov
 * @update-description minor improvements
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function NavbarContent(props) {
    const {i18n} = props

    const scrollNavbar = useRef(null)

    const contentIsMin = useContentSize()

    const scrollBottom = useScrollAction({"position": 20})
    const mediaSmQuery = useMediaMaxState({"screenSize": 1024})

    const [submenuToggle, setSubmenuToggle] = useState(false)
    const [logoAnimateToggle, setLogoAnimateToggle] = useState(false)
    const [submenuAnimateToggle, setSubmenuAnimateToggle] = useState(false)

    const submenuToggleHandle = (value) => setSubmenuToggle(value)
    const logoAnimateToggleHandle = () => setLogoAnimateToggle(!logoAnimateToggle)
    const logoAnimateCloseHandle = () => setLogoAnimateToggle(false)
    const submenuAnimateToggleHandle = () => setSubmenuAnimateToggle(!submenuAnimateToggle)

    const logoOnClickEventHandle = () => {
        logoAnimateToggleHandle()
        setTimeout(() => {
            startAnimateSubmenuToggleHandle()
        }, 200)
    }

    const closeSubmenuAndAnimateToggleHandle = () => {
        logoAnimateCloseHandle()

        setTimeout(() => {
            submenuToggleHandle(false)
        }, 400)
    }

    const startAnimateSubmenuToggleHandle = () => {
        submenuAnimateToggleHandle()

        if (scrollBottom) {
            navbarDefaultMotion()
        }
    }

    const navbarFillMotion = () => {
        gsap.fromTo(scrollNavbar.current,
            {
                top: mediaSmQuery ? 0 : 40
            },
            {
                top: mediaSmQuery ? 0 : 0,
                duration: .2,
                onComplete: () => {
                    gsap.to(scrollNavbar.current,
                        {
                            backgroundColor: "#ffffff",
                            duration: .3,
                        })
                }
            })
    }

    const navbarDefaultMotion = () => {
        gsap.to(scrollNavbar.current,
            {
                top: mediaSmQuery ? 0 : 40,
                duration: .2,
                onComplete: () => {
                    gsap.to(scrollNavbar.current,
                        {
                            backgroundColor: "transparent",
                            duration: .3,
                        })
                }
            })
    }

    useEffect(() => {
        const langCookie = Cookies.get(cookiesName.lang)

        if (!langCookie) {
            Cookies.set(cookiesName.lang, 'en', {expires: 7})
        }
    }, [])

    useEffect(() => {
        if (submenuAnimateToggle) return

        if (scrollBottom) {
            navbarFillMotion()
        } else {
            navbarDefaultMotion()
        }
    }, [scrollBottom, submenuAnimateToggle, mediaSmQuery])

    return (
        <>
            <header
                ref={scrollNavbar}
                className={`${styles['navbar']} ${scrollBottom ? styles['navbar_fill'] : ''}`}>
                <div
                    className={`${styles['navbar_content']} ${contentIsMin ? 'container_md' : 'container_lg'}`}>
                    <Logo
                        isOpenMenu={submenuToggle}
                        active={logoAnimateToggle}
                        onClick={logoOnClickEventHandle}
                        theme={submenuToggle ? "light" : ''}
                    />
                    {submenuToggle ? (
                        <i className={stylesSecondary['menu_closed']}
                           onClick={() => {
                               startAnimateSubmenuToggleHandle()
                               logoAnimateCloseHandle()
                           }}
                        />) : (
                        <PhoneAction i18n={i18n} type={'secondary'} hideContent/>)
                    }
                </div>
            </header>
            <PortalProvider>
                <NavbarSubmenu
                    i18n={i18n}
                    active={submenuToggle}
                    animateTrigger={submenuAnimateToggle}
                    toggleAnimate={startAnimateSubmenuToggleHandle}
                    toggleMenu={() => submenuToggleHandle(false)}
                    hideSubmenuHandle={closeSubmenuAndAnimateToggleHandle}
                    showSubmenuHandle={() => submenuToggleHandle(true)}
                />
            </PortalProvider>
        </>
    );
}

export default NavbarContent;
