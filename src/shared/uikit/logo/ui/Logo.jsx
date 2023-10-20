'use client'

import React from 'react';
import styles from "@/styles/ui-logo.module.sass";
import {motion, useAnimation} from "framer-motion";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Logo(props) {
    const {theme, onClick} = props

    const controls = useAnimation();

    const init = async () => {
        await controls.start({
            rotate: 90,
            // transition: { duration: 0.5, ease: "easeInOut" },
        });

        const animations = [
            {
                o: "#svg_bar_1",
                p: "M35.044,19.904243L39.044,12.095601L52.088,12.095601L52.072269,19.999922L35.044,19.904243Z",
            },
            {
                o: "#svg_bar_2",
                p: "M11.977,35.848501L16.0325,28.1285L52.014,28.1285L51.977,36.0325L11.977,35.848501Z",
            },
            {
                o: "#svg_bar_3",
                p: "M28.0555,52.133688L24.0555,44.001541L51.948,44.129623L51.910296,52.133688L28.0555,52.133688Z",
            },
        ];

        for (const animation of animations) {
            await controls.start({
                d: animation.p,
                transition: { duration: 0.5, ease: "easeInOut" },
            });
        }

        await controls.start({
            // rotate: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
        });
    };

    const handleLogoClick = async (e) => {
        await init();
        // e.target.classList.toggle('--open');
    };

    return (
        <div
            className={`${styles['ui_logo']} ${theme === 'light' ? styles['ui_logo_light'] : ''}`}
            onClick={() => {
                onClick()
                // handleLogoClick()
            }}
            id="main_logotype2"

        >
            <motion.div
                className={styles['ui_logo_items']}
                initial={{rotate: 0}}
                animate={controls}
            >
                <div className={styles['item']}/>
                <div className={styles['item']}/>
                <div className={styles['item']}/>
                {/*<div className={'icon'}>*/}
                {/*    <svg*/}
                {/*        viewBox="0 0 64 64"*/}
                {/*        width="64"*/}
                {/*        height="64"*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*    >*/}
                {/*        <g id="bars">*/}
                {/*            <motion.path*/}
                {/*                id="svg_bar_1"*/}
                {/*                d="M35.044,19.904243L39.044,12.095601L52.088,12.095601L52.072269,19.999922L35.044,19.904243Z"*/}
                {/*                style={{ strokeWidth: 0, fill: '#000' }}*/}
                {/*            ></motion.path>*/}
                {/*            <motion.path*/}
                {/*                id="svg_bar_2"*/}
                {/*                d="M 11.977 31.954 L 12 30 L 52.014 30.024 L 51.977 32 L 11.977 31.954 Z"*/}
                {/*                style={{ strokeWidth: 0, fill: '#000' }}*/}
                {/*            ></motion.path>*/}
                {/*            <motion.path*/}
                {/*                id="svg_bar_3"*/}
                {/*                d="M 12.052 45.978 L 12.052 44 L 52 44.032 L 51.946 46 L 12.052 45.978 Z"*/}
                {/*                style={{ strokeWidth: 0, fill: '#000' }}*/}
                {/*            ></motion.path>*/}
                {/*        </g>*/}
                {/*    </svg>*/}
                {/*</div>*/}
                {/*<div className={'icon'}>*/}
                {/*    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">*/}
                {/*        <g id="bars">*/}
                {/*            <path id="svg_bar_1" d="M 12 17.976 L 12 16 L 52.088 16.024 L 52.051 18 L 12 17.976 Z"*/}
                {/*                  style={{strokeWidth: "0px", fill: "#000"}}></path>*/}
                {/*            <path id="svg_bar_2"*/}
                {/*                  d="M 11.977 31.954 L 12 30 L 52.014 30.024 L 51.977 32 L 11.977 31.954 Z"*/}
                {/*                  style={{strokeWidth: "0px", fill: "#000"}}></path>*/}
                {/*            <path id="svg_bar_3"*/}
                {/*                  d="M 12.052 45.978 L 12.052 44 L 52 44.032 L 51.946 46 L 12.052 45.978 Z"*/}
                {/*                  style={{strokeWidth: "0px", fill: "#000"}}></path>*/}
                {/*        </g>*/}
                {/*    </svg>*/}
                {/*</div>*/}
            </motion.div>

            <div className={styles['ui_logo_text']}>
                <div>Meta</div>
                <div>Trust</div>
            </div>
        </div>
    );
}

export default Logo;
