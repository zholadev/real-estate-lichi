import React from 'react';
import styles from "@/styles/ui-logo.module.sass";
import {routerPage} from "@/entities/router/model/pages";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {useParams, usePathname, useRouter} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @creatd 16.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function LogoTitle(props) {
    const {isOpenMenu, onClick} = props

    const router = useRouter()
    const pathname = usePathname()
    const routerParams = useParams()

    const logoIconOnClickEvent = () => {
        try {
            if (isOpenMenu) onClick()
            if (pathname !== `/${routerParams['lang']}`) router.push(routerPage.main)
        } catch (error) {
            errorHandler("logo", "logoIconOnClickEvent", error)
        }
    }

    return (
        <div className={styles['ui_logo_text']} onClick={logoIconOnClickEvent}>
            <div>Meta</div>
            <div>Trust</div>
        </div>
    );
}

export default LogoTitle;
