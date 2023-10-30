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
    const {title, onClick, url, type = 'button'} = props

    const buttonRef = useRef(null)

    const motionHover = () => {
        gsap.to(buttonRef.current,
            {
                border: '1px solid #000',
                duration: .4,
                ease: "power2.inOut",
                onComplete: args => {
                    gsap.to(buttonRef.current,
                        {
                            backgroundColor: '#000',
                            duration: .5,
                            color: '#fff',
                            filter: 'invert(100%)'
                        }
                    )
                }
            }
        )
    }

    const motionHoverLeave = () => {
        gsap.to(buttonRef.current,
            {
                border: 0,
                duration: .4,
                ease: "power2.inOut",
                onComplete: args => {
                    gsap.to(buttonRef.current,
                        {
                            backgroundColor: 'transparent',
                            duration: .4,
                            color: '#000',
                            filter: 'none'
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
                    className={styles['ui_button_arrow']}
                    onClick={onClickHandle}
                    type={type}
                    // onMouseEnter={() => {
                    //     motionHover()
                    // }}
                    // onMouseLeave={() => {
                    //     motionHoverLeave()
                    // }}
                >
                    <span>{title}</span> <i className={styles['arrow_icon']}/>
                </button>
            </Link>
            :
            <button
                ref={buttonRef}
                className={styles['ui_button_arrow']}
                onClick={onClickHandle}
                type={type}
                // onMouseEnter={() => {
                //     motionHover()
                // }}
                // onMouseLeave={() => {
                //     motionHoverLeave()
                // }}
            >
                <span>{title}</span> <i className={styles['arrow_icon']}/>
            </button>
    );
}

export default ButtonArrow;
