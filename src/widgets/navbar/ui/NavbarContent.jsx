'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/styles/navbar.module.sass";
import {Logo} from "@/shared/uikit/logo";
import stylesSecondary from "@/styles/widget-submenu-navbar.module.sass";
import {PhoneAction} from "@/shared/site";
import {PortalProvider} from "@/shared/portals";
import {NavbarSubmenu} from "@/widgets/submenu";
import {usePathname} from "next/navigation";
import {useWindowScroll} from "@uidotdev/usehooks";

function NavbarContent(props) {
    const {i18n} = props

    const pathname = usePathname()

    // const scrollBottom = useScrollAction({"position": 20})

    const [scrollBottom, setScroll] = useState(false)

    // const [{y}] = useWindowScroll();
    //
    // console.log(y)

    useEffect(() => {
        const scrolled = (e) => {
            const {scrollY} = window
            console.log('scrolled', scrollY)

            if (scrollY >= 20) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }

        window.addEventListener("scroll", scrolled, true)

        return () => {
            window.removeEventListener('scroll', scrolled, true)
        }
    }, [])

    // useEffect(() => {
    //     const options = {passive: true}; // options must match add/remove event
    //     const scroll = (event) => {
    //         console.log(event)
    //         const {scrollY} = window;
    //         console.log('scrollY', scrollY)
    //     };
    //
    //
    //     document.body.addEventListener("scroll", scroll, options);
    //     // remove event on unmount to prevent a memory leak
    //     () =>
    //         document.body.removeEventListener("scroll", scroll, options);
    // }, []);

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


    return (
     <>
         <navbar
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
