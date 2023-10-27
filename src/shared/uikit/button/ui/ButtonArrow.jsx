'use client'

import React from 'react';
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

    const onClickHandle = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        url ?
            <Link href={url}>
                <button
                    className={styles['ui_button_arrow']}
                    onClick={onClickHandle}
                    type={type}
                >
                    <span>{title}</span> <i className={styles['arrow_icon']}/>
                </button>
            </Link>
            :
            <button
                className={styles['ui_button_arrow']}
                onClick={onClickHandle}
                type={type}
            >
                <span>{title}</span> <i className={styles['arrow_icon']}/>
            </button>
    );
}

export default ButtonArrow;
