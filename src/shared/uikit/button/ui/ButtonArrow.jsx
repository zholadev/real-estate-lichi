'use client'

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap"
import Link from "next/link";
import styles from '@/styles/ui-button-arrow.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @last-updated 12.10.2023 - Zholaman Zhumanov
 * @update-description update button components with router
 * @param props
 * @returns {Element}
 * @constructor
 */
function ButtonArrow(props) {
    const {title, onClick, url, attrType = 'button', type, theme} = props

    const buttonRef = useRef(null)
    const textRef = useRef(null)
    const iconRef = useRef(null)

    const motionHover = () => {
        gsap.to(buttonRef.current,
            {
                backgroundColor: '#000',
                duration: .4,
                ease: "power2.inOut",
                padding: type === "small" ? "10px 10px" : "0 30px",
                onComplete: args => {
                    gsap.to(textRef.current,
                        {
                            color: '#ffffff',
                            duration: .3,
                        }
                    )

                    gsap.to(iconRef.current,
                        {
                            filter: "invert(100%)",
                            duration: .3,
                        }
                    )
                }
            }
        )
    }

    const motionHoverLeave = () => {
        gsap.to(buttonRef.current,
            {
                backgroundColor: 'transparent',
                duration: .4,
                ease: "power2.inOut",
                padding: type === "small" ? "10px 0" : "0",
                onComplete: args => {
                    gsap.to(textRef.current,
                        {
                            color: theme === "light" ? "#ffffff" : 'initial',
                            duration: .3,
                        }
                    )

                    gsap.to(iconRef.current,
                        {
                            filter: theme === "light" ? "invert(100%)" : "none",
                            duration: .3,
                        }
                    )
                }
            }
        )
    }

    const onClickHandle = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        url ?
            <Link
                href={url}
            >
                <button
                    ref={buttonRef}
                    className={`${styles['ui_button_arrow']} ${type === 'small' ? styles['ui_button_arrow__small'] : ''}`}
                    onClick={onClickHandle}
                    type={attrType}
                    onMouseEnter={() => {
                        motionHover()
                    }}
                    onMouseLeave={() => {
                        motionHoverLeave()
                    }}
                >
                    <span ref={textRef}>{title}</span> <i ref={iconRef} className={styles['arrow_icon']}/>
                </button>
            </Link>
            :
            <button
                ref={buttonRef}
                className={`${styles['ui_button_arrow']} ${type === 'small' ? styles['ui_button_arrow__small'] : ''}`}
                onClick={onClickHandle}
                type={attrType}
                onMouseEnter={() => {
                    motionHover()
                }}
                onMouseLeave={() => {
                    motionHoverLeave()
                }}
            >
                <span ref={textRef}>{title}</span> <i ref={iconRef} className={styles['arrow_icon']}/>
            </button>
    );
}

export default ButtonArrow;
