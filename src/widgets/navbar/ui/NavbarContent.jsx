'use client'

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap"
import {Logo} from "@/shared/uikit/logo";
import {PhoneAction} from "@/shared/site";
import {useParams, usePathname} from "next/navigation";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import styles from "@/styles/navbar.module.sass";
import {useMediaMaxState, useScrollAction} from "@/shared/hooks";
import stylesSecondary from "@/styles/widget-submenu-navbar.module.sass";
import Cookies from "js-cookie";

function NavbarContent(props) {
    const {i18n} = props

    const scrollNavbar = useRef(null)

    const pathname = usePathname()
    const routerParams = useParams()

    const scrollBottom = useScrollAction({"position": 20})
    const mediaSmQuery = useMediaMaxState({screenSize: 768})

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
                className={`${styles['navbar']} ${pathname === `/catalog/residence/${routerParams?.["id"]}` ? styles['navbar_full_wd'] : ''} ${scrollBottom ? styles['navbar_fill'] : ''}`}>
                <div
                    className={`${styles['navbar_content']} ${pathname === `/catalog/residence/${routerParams?.["id"]}` || pathname === `/catalog/apartment/${routerParams?.["id"]}` || pathname === '/about' || pathname === '/faq' ? 'container_lg' : 'container_md'}`}>
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
                    fullWidth={pathname === `/catalog/residence/${routerParams?.["id"]}` || pathname === `/catalog/apartment/${routerParams?.["id"]}` || pathname === '/about' || pathname === '/faq'}
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
