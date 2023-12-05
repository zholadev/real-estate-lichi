'use client'

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap"
import Cookies from "js-cookie";
import {Logo} from "@/shared/uikit/logo";
import {PhoneAction} from "@/shared/site";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import styles from "@/styles/navbar.module.sass";
import {useParams, usePathname} from "next/navigation";
import {useMediaMaxState, useScrollAction} from "@/shared/hooks";
import stylesSecondary from "@/styles/widget-submenu-navbar.module.sass";

function NavbarContent(props) {
    const {i18n} = props

    const scrollNavbar = useRef(null)

    const pathname = usePathname()
    const routerParams = useParams()

    const scrollBottom = useScrollAction({"position": 20})
    const mediaSmQuery = useMediaMaxState({"screenSize": 768})

    const [toggleNavbar, setToggleNavbar] = useState(false)
    const [animateTrigger, setAnimateTrigger] = useState(false)
    const [animateLogoTrigger, setAnimateLogoTrigger] = useState(false)

    const toggleAnimateTrigger = () => {
        setAnimateTrigger(!animateTrigger)

        if (scrollBottom) {
            navbarDefaultMotion()
        }
    }

    const toggleLogoAnimateTrigger = () => {
        setAnimateLogoTrigger(!animateLogoTrigger)
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
        const langCookie = Cookies.get('dubai_lang')

        if (!langCookie) {
            Cookies.set('dubai_lang', 'en', {expires: 7})
        }
    }, [])

    useEffect(() => {
        if (animateTrigger) return

        if (scrollBottom) {
            navbarFillMotion()
        } else {
            navbarDefaultMotion()
        }
    }, [scrollBottom, animateTrigger, mediaSmQuery])

    return (
        <>
            <header
                ref={scrollNavbar}
                className={`${styles['navbar']} ${scrollBottom ? styles['navbar_fill'] : ''}`}>
                <div
                    className={`${styles['navbar_content']} ${pathname == `/${routerParams['lang']}` || pathname == `/${routerParams['lang']}/catalog` || pathname == `/${routerParams['lang']}/news` || pathname == `/${routerParams['lang']}/news/${routerParams['id']}` ? 'container_md' : 'container_lg'}`}>
                    <Logo
                        onClick={() => {
                            toggleLogoAnimateTrigger()
                            setTimeout(() => {
                                toggleAnimateTrigger()
                            }, 200)
                        }}
                        active={animateLogoTrigger}
                        theme={toggleNavbar ? "light" : ''}
                    />
                    {toggleNavbar ?
                        <i className={stylesSecondary['menu_closed']} onClick={() => {
                            toggleAnimateTrigger()
                            setAnimateLogoTrigger(false)
                        }}/>
                        : <PhoneAction i18n={i18n} type={'secondary'} hideContent/>}
                </div>
            </header>
            <PortalProvider>
                <NavbarSubmenu
                    fullWidth={pathname == `/${routerParams['lang']}` || pathname == `/${routerParams['lang']}/catalog` || pathname == `/${routerParams['lang']}/news` || pathname == `/${routerParams['lang']}/news/${routerParams['id']}`}
                    i18n={i18n}
                    active={toggleNavbar}
                    animateTrigger={animateTrigger}
                    toggleMenu={() => setToggleNavbar(false)}
                    showSubmenuHandle={() => setToggleNavbar(true)}
                    hideSubmenuHandle={() => {
                        setToggleNavbar(false)
                        setAnimateLogoTrigger(false)
                    }}
                    toggleAnimate={toggleAnimateTrigger}
                />
            </PortalProvider>
        </>
    );
}

export default NavbarContent;
