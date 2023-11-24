'use client'

import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from "@/styles/ui-logo.module.sass";
import {gsap} from "gsap";

const animationsPath = [
    {
        p: "M5.10656 5L13.9902 5L16.4902 5L16.4902 -1.67393e-06L13.9902 -1.56465e-06L0.0126951 0L5.10656 5Z",
    },
    {
        p: "M0 5L30.9895 5L33.4895 5L33.4895 -1.94071e-06L30.9895 -1.83143e-06L5.15798 -1.65597e-06L5.15799 2.63556e-06L0 5Z",
    },
    {
        p: "M4.99927 5L18.9904 5L21.4904 5L21.4904 -9.35962e-07L18.9904 -1.30352e-06L0.0781248 -2.86102e-06L4.99927 5Z",
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

const easeIcon = "expoScale(0.5,7,none)"
const easeIconBox = "slow(0.7,0.7,false)"
const easeElastic = "elastic.inOut"
const easingPowerInOut = "power2.inOut"

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Logo(props) {
    const {theme, onClick, type, active, activeColor} = props

    const contentLogoBox = useRef(null)

    const contentLogoF = useRef(null)
    const contentLogoBoxF = useRef(null)


    const contentLogoS = useRef(null)
    const contentLogoBoxS = useRef(null)


    const contentLogoT = useRef(null)
    const contentLogoBoxT = useRef(null)

    const [motionIsOn, setMotionIsOn] = useState(false)

    const svgFillColor = useMemo(() => {
        return activeColor ? "#fff" : "#16181D"
    }, [motionIsOn, activeColor])

    const motionAnimateInitial = () => {
        gsap.to(contentLogoBox.current,
            {
                rotate: 90,
                ease: easingPowerInOut,
                duration: .3,
                onComplete: () => {
                    gsap.to(contentLogoBoxF.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 17,
                            height: 5,
                            fill: "none",
                            viewBox: "0 0 17 5"
                        },
                        onComplete: () => {
                            gsap.fromTo(contentLogoF.current,
                                {
                                    attr: {
                                        fill: '#16181D',
                                    }
                                },
                                {
                                    ease: easeIcon,
                                    duration: 1,
                                    delay: .3,
                                    attr: {
                                        fill: '#fff',
                                    },
                                })
                            gsap.fromTo(contentLogoF.current,
                                {},
                                {
                                    ease: easeIcon,
                                    duration: .8,
                                    delay: .3,
                                    x: 0,
                                    attr: {
                                        d: animationsPath[0]["p"],
                                        ['stroke-width']: 0
                                    },
                                })

                        }
                    })

                    gsap.to(contentLogoBoxS.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 34,
                            height: 5,
                            fill: "none",
                            viewBox: "0 0 34 5"
                        },
                        onComplete: () => {
                            gsap.fromTo(contentLogoS.current,
                                {
                                    attr: {
                                        fill: '#16181D',
                                    }
                                },
                                {
                                    ease: easeIcon,
                                    duration: .4,
                                    delay: .2,
                                    x: 0,
                                    attr: {
                                        d: animationsPath[1]["p"],
                                        fill: '#fff',
                                        ['stroke-width']: 0
                                    },
                                })
                        }
                    })

                    gsap.to(contentLogoBoxT.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 22,
                            height: 5,
                            fill: "none",
                            viewBox: "0 0 22 5"
                        },
                        onComplete: () => {
                            gsap.fromTo(contentLogoT.current,
                                {
                                    attr: {
                                        fill: '#16181D',
                                    }
                                },
                                {
                                    ease: easeIcon,
                                    duration: .2,
                                    delay: .1,
                                    x: 0,
                                    attr: {
                                        d: animationsPath[2]["p"],
                                        fill: '#fff',
                                        ['stroke-width']: 0
                                    },
                                })
                        }
                    })
                }
            },
        )
    }

    const motionReverseAnimate = () => {
        gsap.to(contentLogoBox.current,
            {
                rotate: 0,
                ease: easingPowerInOut,
                duration: .5,
                onComplete: () => {
                    gsap.to(contentLogoBoxF.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 24,
                            height: 2,
                            fill: "none",
                            viewBox: "0 0 24 2"
                        },
                        onComplete: () => {
                            gsap.to(contentLogoF.current, {
                                ease: easeIcon,
                                duration: .2,
                                attr: {
                                    d: animationsPathDefault[0]["p"],
                                    fill: '#16181D',
                                    ['stroke-width']: 2
                                },
                            })
                        }
                    })

                    gsap.to(contentLogoBoxS.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 36,
                            height: 2,
                            fill: "none",
                            viewBox: "0 0 36 2"
                        },
                        onComplete: () => {
                            gsap.to(contentLogoS.current, {
                                ease: easeIcon,
                                duration: .2,
                                attr: {
                                    d: animationsPathDefault[1]["p"],
                                    fill: '#16181D',
                                    ['stroke-width']: 2
                                },
                            })
                        }
                    })

                    gsap.to(contentLogoBoxT.current, {
                        ease: easeIconBox,
                        duration: 0,
                        attr: {
                            width: 24,
                            height: 2,
                            fill: "none",
                            viewBox: "0 0 24 2"
                        },
                        onComplete: () => {
                            gsap.to(contentLogoT.current, {
                                ease: easeIcon,
                                duration: .2,
                                attr: {
                                    d: animationsPathDefault[2]["p"],
                                    fill: '#16181D',
                                    ['stroke-width']: 2
                                },
                            })
                        }
                    })
                }
            })


    }

    useEffect(() => {
        if (motionIsOn) {
            motionAnimateInitial()
        } else {
            setTimeout(() => {
                motionReverseAnimate()
            }, 400)
        }
    }, [motionIsOn]);

    useEffect(() => {
        if (type === 'secondary') return
        if (active) {
            setMotionIsOn(true)
        } else {
            setMotionIsOn(false)
        }
    }, [active, type])

    return (
        <div
            className={`${styles['ui_logo']} ${theme === 'light' ? styles['ui_logo_light'] : ''}`}
            onClick={onClick}
        >
            {
                type === 'secondary' ?
                    <div className={`${styles['icon_box']} ${styles['icon_box_row']}`}>
                        <svg width="5" height="22" viewBox="0 0 5 22" fill="none" style={{marginRight: '6px'}}
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.12275e-06 5.50904L0 19.5002V22.0002H5L5 19.5002L5 0.587891L2.12275e-06 5.50904Z"
                                  fill="#16181D"/>
                        </svg>

                        <svg width="5" height="34" viewBox="0 0 5 34" fill="none" style={{marginRight: '6px'}}
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.73847e-06 0.510254L0 31.4998V33.9998H5V31.4998L5 5.66824L5 5.66824L1.73847e-06 0.510254Z"
                                fill="#16181D"/>
                        </svg>

                        <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 5.61632V14.5V17H5V14.5L5 0.522461L0 5.61632Z" fill="#16181D"/>
                        </svg>
                    </div>
                    :
                    <div ref={contentLogoBox} className={`${styles['icon_box']} icon`}>
                        <svg
                            ref={contentLogoBoxF}
                            width="24"
                            height="2"
                            viewBox="0 0 24 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1 1L23 1" stroke="#16181D" strokeWidth={2} ref={contentLogoF}/>
                        </svg>

                        <svg
                            ref={contentLogoBoxS}
                            width="36"
                            height="2"
                            viewBox="0 0 36 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1 1H35" stroke="#16181D" strokeWidth={2} ref={contentLogoS}/>
                        </svg>

                        <svg
                            ref={contentLogoBoxT}
                            width="24"
                            height="2"
                            viewBox="0 0 24 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1 1L23 1" stroke="#16181D" strokeWidth={2} ref={contentLogoT}/>
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


// <div className={styles['icon_box']} ref={contentRotateRef}>
//     <svg width="24" height="2" viewBox="0 0 24 2" fill="none"
//          xmlns="http://www.w3.org/2000/svg" style={{marginBottom: '10px'}}>
//         <path d="M1 1L23 1" stroke="#16181D" strokeWidth="2" strokeLinecap="square"/>
//     </svg>
//
//     <svg width="36" height="2" viewBox="0 0 36 2" fill="none"
//          xmlns="http://www.w3.org/2000/svg" style={{marginBottom: '10px'}}>
//         <path d="M1 1H35" stroke="#16181D" strokeWidth="2" strokeLinecap="square"/>
//     </svg>
//
//     <svg width="24" height="2" viewBox="0 0 24 2" fill="none"
//          xmlns="http://www.w3.org/2000/svg">
//         <path d="M1 1L23 1" stroke="#16181D" strokeWidth="2" strokeLinecap="square"/>
//     </svg>
// </div>


// <div>
//
//     <svg width="5" height="22" viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M2.12275e-06 5.50904L0 19.5002V22.0002H5L5 19.5002L5 0.587891L2.12275e-06 5.50904Z" fill="#16181D"/>
//     </svg>
//
//     <svg width="5" height="34" viewBox="0 0 5 34" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M1.73847e-06 0.510254L0 31.4998V33.9998H5V31.4998L5 5.66824L5 5.66824L1.73847e-06 0.510254Z" fill="#16181D"/>
//     </svg>
//
//     <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.61632V14.5V17H5V14.5L5 0.522461L0 5.61632Z" fill="#16181D"/>
//     </svg>
//
// </div>

//
// <div>
//     <svg width="17" height="5" viewBox="0 0 17 5" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5.10656 5L13.9902 5L16.4902 5L16.4902 -1.67393e-06L13.9902 -1.56465e-06L0.0126951 0L5.10656 5Z" fill="#16181D"/>
//     </svg>
//
//
//     <svg width="34" height="5" viewBox="0 0 34 5" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M0 5L30.9895 5L33.4895 5L33.4895 -1.94071e-06L30.9895 -1.83143e-06L5.15798 -1.65597e-06L5.15799 2.63556e-06L0 5Z" fill="#16181D"/>
//     </svg>
//
//
//     <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4.99927 5L18.9904 5L21.4904 5L21.4904 -9.35962e-07L18.9904 -1.30352e-06L0.0781248 -2.86102e-06L4.99927 5Z" fill="#16181D"/>
//     </svg>
//
// </div>
