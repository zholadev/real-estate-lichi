'use client'

import React, {useEffect, useState} from 'react';
import {Logo} from "@/shared/uikit/logo";
import styles from '@/styles/navbar.module.sass'
import stylesSecondary from '@/styles/widget-submenu-navbar.module.sass'
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import {PhoneAction} from "@/shared/site";
import {useScrollAction} from "@/shared/hooks";
import {useRouter, usePathname} from "next/navigation";

// TODO: refac

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Navbar(props) {
    const {i18n} = props

    const pathname = usePathname()

    const scrollBottom = useScrollAction({"position": 20})

    const [toggleNavbar, setToggleNavbar] = useState(false)
    const [animateTrigger, setAnimateTrigger] = useState(false)
    const [animateLogoTrigger, setAnimateLogoTrigger] = useState(false)

    const toggleNavbarHandle = () => {
        setToggleNavbar(!toggleNavbar)
    }

    const toggleAnimateTrigger = () => {
        setAnimateTrigger(!animateTrigger)
    }

    const toggleLogoAnimateTrigger = () => {
        setAnimateLogoTrigger(!animateLogoTrigger)
    }

    return (
        <>
            <navbar className={`${styles['navbar']} ${pathname === '/catalog/apartment' ? styles['navbar_full_wd'] : ''} ${scrollBottom ? styles['navbar_fill'] : ''}`}>
                <div className={`${styles['navbar_content']} ${pathname === '/catalog/apartment' || pathname === '/catalog/object' || pathname === '/about' || pathname === '/faq' ? 'container_lg' : 'container_md'}`}>
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

export default Navbar;
