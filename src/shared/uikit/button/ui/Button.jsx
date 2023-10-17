'use client'

import React from 'react';
import Link from "next/link";
import styles from '@/styles/ui-button.module.sass'

function Button(props) {
    const {type = 'button', title, children, style, onClick, url} = props

    const onClickHandle = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        url ?
            <Link href={url}>
                <button
                    className={`${styles['ui_button']} ${type === 'secondary' ? styles['ui_button_secondary'] : type === 'outline' ? styles['ui_button_outline'] : type === 'outline_light' ? styles['ui_button_outline_light'] : type === 'secondary_dark' ? styles['ui_button_secondary_dark'] : ''} `}
                    style={style}
                    onClick={onClickHandle}
                    type={type}
                >
                    <span>{children ? children : title}</span>
                </button>
            </Link>
            :
            <button
                className={`${styles['ui_button']} ${type === 'secondary' ? styles['ui_button_secondary'] : type === 'outline' ? styles['ui_button_outline'] : type === 'outline_light' ? styles['ui_button_outline_light'] : type === 'secondary_dark' ? styles['ui_button_secondary_dark'] : ''} `}
                style={style}
                onClick={onClickHandle}
                type={type}
            >
                <span>{children ? children : title}</span>
            </button>
    );
}

export default Button;
