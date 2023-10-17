'use client'

import React, {useCallback, useState} from 'react';
import {Logo} from "@/shared/uikit/logo";
import styles from '@/styles/navbar.module.sass'
import {SwitchLocalization} from "@/widgets/switch/localication";
import Link from "next/link";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import {PhoneLink} from "@/shared/uikit/links";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Navbar(props) {
    const {i18n} = props

    const [toggleNavbar, setToggleNavbar] = useState(false)

    const toggleNavbarHandle = useCallback(() => {
        setToggleNavbar(!toggleNavbar)
    }, [toggleNavbar])

    return (
        <>
            <navbar className={styles['navbar']}>
                <div className={`${styles['navbar_content']} container_lg`}>
                    <Logo onClick={toggleNavbarHandle}/>

                    <div className={styles['navbar_action']}>
                        <PhoneLink i18n={i18n} type={'secondary'}/>
                        <SwitchLocalization hideContent/>
                    </div>
                </div>
            </navbar>
            <PortalProvider>
                <NavbarSubmenu
                    i18n={i18n}
                    active={toggleNavbar}
                    toggle={toggleNavbarHandle}
                />
            </PortalProvider>
        </>

    );
}

export default Navbar;
