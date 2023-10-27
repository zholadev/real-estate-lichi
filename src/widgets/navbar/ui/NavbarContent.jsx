'use client'

import React, {useEffect, useRef, useState} from 'react';
import styles from "@/styles/navbar.module.sass";
import {Logo} from "@/shared/uikit/logo";
import stylesSecondary from "@/styles/widget-submenu-navbar.module.sass";
import {PhoneAction} from "@/shared/site";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import {usePathname} from "next/navigation";
import {useMediaMaxState, useScrollAction} from "@/shared/hooks";
import {gsap} from "gsap"

function NavbarContent(props) {
    const {i18n} = props

    const scrollNavbar = useRef(null)

    const pathname = usePathname()

    const scrollBottom = useScrollAction({"position": 20})

    const mediaSmQuery = useMediaMaxState({screenSize: 768})


    const [toggleNavbar, setToggleNavbar] = useState(false)
    const [animateTrigger, setAnimateTrigger] = useState(false)
    const [animateLogoTrigger, setAnimateLogoTrigger] = useState(false)

    const toggleNavbarHandle = () => {
        setToggleNavbar(!toggleNavbar)
    }

    const toggleAnimateTrigger = () => {
        setAnimateTrigger(!animateTrigger)
        console.log(window.scrollY)
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
                            duration: .4,
                            onComplete: () => {
                                // gsap.to(scrollNavbar.current,
                                //     {
                                //         height: 72,
                                //         duration: .4
                                //     })
                            }
                        })
                }
            })
    }

    const navbarDefaultMotion = () => {
        gsap.fromTo(scrollNavbar.current,
            {
                top: mediaSmQuery ? 0 : 0
            },
            {
                top: mediaSmQuery ? 0 : 40,
                duration: .2,
                onComplete: () => {
                    gsap.to(scrollNavbar.current,
                        {
                            backgroundColor: "transparent",
                            duration: .4,
                            onComplete: () => {
                                // gsap.to(scrollNavbar.current,
                                //     {
                                //         height: mediaSmQuery ? 70 : 58,
                                //         duration: .4
                                //     })
                            }
                        })
                }
            })
    }

    const navbarDefaultMotionTrigger = () => {
        gsap.to(scrollNavbar.current,
            {
                backgroundColor: "transparent",
                duration: .4
            })
    }

    useEffect(() => {
        if (animateTrigger) {
            navbarDefaultMotionTrigger()
            return
        }

        if (scrollBottom && !animateTrigger) {
            navbarFillMotion()
        } else {
            navbarDefaultMotion()
        }
    }, [scrollBottom, animateTrigger, mediaSmQuery])

    return (
        <>
            <navbar
                ref={scrollNavbar}
                className={`${styles['navbar']} ${pathname === '/catalog/apartment' ? styles['navbar_full_wd'] : ''} ${scrollBottom ? styles['navbar_fill'] : ''}`}>
                <div
                    className={`${styles['navbar_content']} ${pathname === '/catalog/apartment' || pathname === '/catalog/object' || pathname === '/about' || pathname === '/faq' ? 'container_lg' : 'container_md'}`}>
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
            </navbar>
            <PortalProvider>
                <NavbarSubmenu
                    fullWidth={pathname === '/catalog/apartment' || pathname === '/catalog/object' || pathname === '/about' || pathname === '/faq'}
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
