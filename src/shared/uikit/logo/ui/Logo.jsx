

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap";
import LogoTitle from "./LogoTitle";
import LogoIconPrimary from "./LogoIconPrimary";
import {easings} from "@/shared/constants/easings";
import styles from "@/styles/ui-logo.module.sass";
import LogoIconSecondary from "./LogoIconSecondary";

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

const darkColor = '#16181D'
const defaultColor = '#ffffff'

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @last-updated 16.01.2024 - Zholaman Zhumanov
 * @upate-description refactoring
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Logo(props) {
    const {theme, onClick, type, active, isOpenMenu} = props

    const logoIcon1 = useRef(null)
    const logoIcon2 = useRef(null)
    const logoIcon3 = useRef(null)
    const logoIconPath1 = useRef(null)
    const logoIconPath2 = useRef(null)
    const logoIconPath3 = useRef(null)
    const logoContainerRef = useRef(null)
    const timerMotionAnimate = useRef(null)

    const [motionIsOn, setMotionIsOn] = useState(false)

    /**
     * @description container logo animate
     * @param onComplete
     * @param duration
     */
    const logoContainerMotion = (onComplete, duration = .3) => {
        gsap.to(logoContainerRef.current,
            {
                rotate: !motionIsOn ? 0 : 90,
                ease: easings.easingPowerInOut,
                duration: duration,
                onComplete: () => onComplete()
            },
        )
    }

    /**
     * @description Start animation for icons
     * @param logoIcon
     * @param logoIconPath
     * @param width
     * @param height
     * @param viewBox
     * @param animationPathIndex
     * @param initialDuration
     * @param initialDelay
     * @param finalDuration
     * @param finalDelay
     * @param playSecond
     */
    const animateLogoIcon = (logoIcon, logoIconPath, width, height, viewBox, animationPathIndex, {
        initialDuration,
        initialDelay,
        finalDuration,
        finalDelay,
        playSecond
    }) => {
        gsap.to(logoIcon.current, {
            ease: easings.easeIconBox,
            duration: 0,
            attr: {
                width,
                height,
                fill: "none",
                viewBox,
            },
            onComplete: args => {
                playSecond &&
                gsap.fromTo(logoIconPath.current,
                    {
                        attr: {
                            fill: darkColor,
                        }
                    },
                    {
                        ease: easings.easeIcon,
                        duration: initialDuration,
                        delay: initialDelay,
                        attr: {
                            fill: defaultColor,
                        },
                    })

                gsap.fromTo(logoIconPath.current,
                    {},
                    {
                        ease: easings.easeIcon,
                        duration: finalDuration,
                        delay: finalDelay,
                        x: 0,
                        attr: {
                            d: animationsPath[animationPathIndex]["p"],
                            fill: defaultColor,
                            ['stroke-width']: 0,
                        },
                    })
            }
        })
    }

    /**
     * @description start animate
     */
    const logoInitIconMotion = () => {
        animateLogoIcon(logoIcon1, logoIconPath1, 17, 5, "0 0 17 5", 0,
            {initialDuration: 1, initialDelay: .3, finalDuration: .8, finalDelay: .3, playSecond: true});
        animateLogoIcon(logoIcon2, logoIconPath2, 34, 5, "0 0 34 5", 1,
            {initialDuration: .4, initialDelay: .2, finalDuration: .4, finalDelay: .2, playSecond: false});
        animateLogoIcon(logoIcon3, logoIconPath3, 22, 5, "0 0 22 5", 2,
            {initialDuration: .2, initialDelay: .1, finalDuration: .2, finalDelay: .1, playSecond: false});
    }

    /**
     * @description reverse animate for icons path
     * @param logoIcon
     * @param logoIconPath
     * @param width
     * @param height
     * @param viewBox
     * @param animationPathIndex
     * @param duration
     * @param initialDuration
     */
    const reverseLogoIcon = (logoIcon, logoIconPath, width, height, viewBox, animationPathIndex, duration, initialDuration) => {
        gsap.to(logoIcon.current, {
            ease: easings.easeIconBox,
            duration: duration,
            attr: {
                width,
                height,
                fill: "none",
                viewBox,
            },
            onComplete: args => {
                gsap.fromTo(logoIconPath.current,
                    {},
                    {
                        ease: easings.easeIcon,
                        duration: initialDuration,
                        attr: {
                            d: animationsPathDefault[animationPathIndex]["p"],
                            fill: darkColor,
                            ['stroke-width']: 2,
                        },
                    })
            }
        })
    }

    /**
     * @description finish animate for icons
     */
    const logoIconReverseMotion = () => {
        reverseLogoIcon(logoIcon1, logoIconPath1, 24, 2, "0 0 24 2", 0, .1, .2)
        reverseLogoIcon(logoIcon2, logoIconPath2, 36, 2, "0 0 36 2", 1, .2, .3)
        reverseLogoIcon(logoIcon3, logoIconPath3, 24, 2, "0 0 24 2", 2, .3, .4)
    }

    /**
     * @description animation events
     */
    const motionAnimateInitial = () => logoContainerMotion(logoInitIconMotion, .3)
    const motionReverseAnimate = () => logoContainerMotion(logoIconReverseMotion, .7)

    useEffect(() => {
        if (motionIsOn) {
            motionAnimateInitial()
        } else {
            timerMotionAnimate.current = setTimeout(() => {
                motionReverseAnimate()
            }, 400)
        }

        return () => {
            clearTimeout(timerMotionAnimate.current)

            // if (logoContainerRef.current) logoContainerRef.current.kill()
            // if (logoIconPath1.current) logoIconPath1.current.kill()
            // if (logoIcon1.current) logoIcon1.current.kill()
            // if (logoIconPath2.current) logoIconPath2.current.kill()
            // if (logoIcon2.current) logoIcon2.current.kill()
            // if (logoIconPath3.current) logoIconPath3.current.kill()
            // if (logoIcon3.current) logoIcon3.current.kill()
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
        >
            {
                type === 'secondary' ?
                    <LogoIconSecondary onClick={onClick}/>
                    :
                    <LogoIconPrimary
                        onClick={onClick}
                        refIcon1={logoIcon1}
                        refIcon2={logoIcon2}
                        refIcon3={logoIcon3}
                        refIconPath1={logoIconPath1}
                        refIconPath2={logoIconPath2}
                        refIconPath3={logoIconPath3}
                        refContainer={logoContainerRef}
                    />
            }

            <LogoTitle onClick={onClick} isOpenMenu={isOpenMenu}/>
        </div>
    )

}

export default Logo;
