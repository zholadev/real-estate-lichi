'use client'

import React, {useEffect, useRef} from 'react';
import styles from "@/styles/ui-logo.module.sass";
import anime from "animejs";

const animationsPath = [
    {
        p: "M2.12275e-06 5.50904L0 19.5002V22.0002H5L5 19.5002L5 0.587891L2.12275e-06 5.50904Z",
    },
    {
        p: "M11.977,35.848501L16.0325,28.1285L52.014,28.1285L51.977,36.0325L11.977,35.848501Z",
    },
    {
        p: "M28.0555,52.133688L24.0555,44.001541L51.948,44.129623L51.910296,52.133688L28.0555,52.133688Z",
    },
];

const animationsPathDefault = [
    {
        p: "M1 1L23 1",
        height: "2",
        width: "24"
    },
    {
        p: "M1 1H35",
        height: "2",
        width: "36"
    },
    {
        p: "M1 1L23 1",
        height: "2",
        width: "24"
    },
];

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Logo(props) {
    const {theme, onClick, type} = props

    const timelineRef = useRef(null);

    const init = () => {
        const tl = anime.timeline({
            easing: 'easeOutElastic(1, 0.8)',
            duration: 500,
            autoplay: false,
        });

        tl.add({
            targets: '.icon',
            rotate: 90,
        }, 0);

        const pathData = [
            {
                o: '#svg_bar_1',
                p: 'M35.044,19.904243L39.044,12.095601L52.088,12.095601L52.072269,19.999922L35.044,19.904243Z',
            },
            {
                o: '#svg_bar_2',
                p: 'M11.977,35.848501L16.0325,28.1285L52.014,28.1285L51.977,36.0325L11.977,35.848501Z',
            },
            {
                o: '#svg_bar_3',
                p: 'M28.0555,52.133688L24.0555,44.001541L51.948,44.129623L51.910296,52.133688L28.0555,52.133688Z',
            },
        ];

        pathData.forEach((el, i) => {
            tl.add({
                targets: el.o,
                d: el.p,
            }, 100 * (i + 1));
        });

        timelineRef.current = tl;
    };

    const handleClick = (e) => {
        if (type === 'secondary') return
        if (timelineRef.current) {
            timelineRef.current.play();
            timelineRef.current.finished.then(() => {
                timelineRef.current.reverse();
                if (onClick) {
                    onClick()
                }
            });
        }
    };

    // Call the `init` function when the component is mounted.
    useEffect(() => {
        init();
    }, []);

    return (
        <div
            className={`${styles['ui_logo']} ${theme === 'light' ? styles['ui_logo_light'] : ''}`}
            onClick={handleClick}
        >
            {/*<motion.div*/}
            {/*    className={styles['ui_logo_items']}*/}
            {/*    initial={{rotate: 0}}*/}
            {/*    animate={controls}*/}
            {/*>*/}
            {/*    /!*<div className={styles['item']}/>*!/*/}
            {/*    /!*<div className={styles['item']}/>*!/*/}
            {/*    /!*<div className={styles['item']}/>*!/*/}

            {/*    <motion.svg*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*        width={isOpened ? "5" : "24"}*/}
            {/*        height={isOpened ? "22" : "2"}*/}
            {/*        viewBox={isOpened ? "0 0 5 22" : "0 0 24 2"}*/}
            {/*        fill="none"*/}
            {/*        style={{marginBottom: "10px"}}*/}
            {/*    >*/}
            {/*        <motion.path*/}
            {/*            d={isOpened ? animationsPath[0].p : animationsPathDefault[0].p}*/}
            {/*            stroke="#16181D"*/}
            {/*            strokeWidth="2" strokeLinecap="square"*/}
            {/*            animate={controlPath1}*/}
            {/*            transition={{duration: 0.5}}*/}
            {/*        />*/}
            {/*    </motion.svg>*/}
            {/*    <motion.svg*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*        width="36"*/}
            {/*        height="2"*/}
            {/*        viewBox="0 0 36 2"*/}
            {/*        fill="none"*/}
            {/*        style={{marginBottom: "10px"}}*/}
            {/*    >*/}
            {/*        <motion.path*/}
            {/*            d={isOpened ? animationsPath[1].p : animationsPathDefault[1].p}*/}
            {/*            stroke="#16181D"*/}
            {/*            strokeWidth="2" strokeLinecap="square"*/}
            {/*            animate={controlPath2}*/}
            {/*            transition={{duration: 0.5}}*/}
            {/*        />*/}
            {/*    </motion.svg>*/}
            {/*    <motion.svg*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*        width="24"*/}
            {/*        height="2"*/}
            {/*        viewBox="0 0 24 2"*/}
            {/*        fill="none"*/}
            {/*    >*/}
            {/*        <motion.path*/}
            {/*            d={isOpened ? animationsPath[2].p : animationsPathDefault[2].p}*/}
            {/*            stroke="#16181D"*/}
            {/*            strokeWidth="2" strokeLinecap="square"*/}
            {/*            animate={controlPath3}*/}
            {/*            transition={{duration: 0.5}}*/}
            {/*        />*/}
            {/*    </motion.svg>*/}
            {/*</motion.div>*/}
            {
                type === 'secondary' ?
                    <div className={`${styles['icon']} ${styles['icon_sc']}`}>
                        <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <g id="bars">
                                <path id="svg_bar_1"
                                      d="M35.044,19.904243L39.044,12.095601L52.088,12.095601L52.072269,19.999922L35.044,19.904243Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                                <path id="svg_bar_2"
                                      d="M11.977,35.848501L16.0325,28.1285L52.014,28.1285L51.977,36.0325L11.977,35.848501Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                                <path id="svg_bar_3"
                                      d="M28.0555,52.133688L24.0555,44.001541L51.948,44.129623L51.910296,52.133688L28.0555,52.133688Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                            </g>
                        </svg>
                    </div>
                    :
                    <div className={`${styles['icon']} icon`}>
                        <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <g id="bars">
                                <path id="svg_bar_1" d="M 12 17.976 L 12 16 L 52.088 16.024 L 52.051 18 L 12 17.976 Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                                <path id="svg_bar_2"
                                      d="M 11.977 31.954 L 12 30 L 52.014 30.024 L 51.977 32 L 11.977 31.954 Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                                <path id="svg_bar_3"
                                      d="M 12.052 45.978 L 12.052 44 L 52 44.032 L 51.946 46 L 12.052 45.978 Z"
                                      style={{strokeWidth: 0, fill: theme === 'light' ? '#fff' : '#000'}}/>
                            </g>
                        </svg>
                    </div>
            }

            <div className={styles['ui_logo_text']}>
                <div>Meta</div>
                <div>Trust</div>
            </div>
        </div>
    )

}

export default Logo;
