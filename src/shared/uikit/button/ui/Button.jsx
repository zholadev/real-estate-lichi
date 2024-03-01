import React, {useRef} from 'react';
import Link from "next/link";
import styles from '@/styles/ui-button.module.sass'
import {Spinner} from "@/shared/uikit/template/spinner";


/**
 * @author Zholaman Zhumanov
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function Button(props) {
    const {
        type,
        title,
        children,
        style,
        onClick,
        url,
        animateActive,
        disabled = false,
        buttonType = 'button',
        loader
    } = props

    const buttonAnimateRef = useRef(null)

    const onClickHandle = () => {
        if (onClick) {
            onClick()
        }
    }

    const className = `${styles['ui_button']} ${disabled ? 'cursor-disabled' : ''} ${animateActive && type === 'primary_animate' ? styles['animate_bg_fill'] : ''} ${type === 'secondary' ? styles['ui_button_secondary'] : type === 'outline' ? styles['ui_button_outline'] : type === 'outline_light' ? styles['ui_button_outline_light'] : type === 'primary_animate' ? styles['ui_button_primary_animate'] : type === 'secondary_dark' ? styles['ui_button_secondary_dark'] : ''} `

    return (
        url ?
            <Link href={url}>
                <button
                    className={className}
                    style={style}
                    onClick={onClickHandle}
                    type={buttonType}
                    disabled={disabled}
                >
                    <span>{children ? children : title}</span>
                </button>
            </Link>
            :
            <button
                className={className}
                style={style}
                onClick={onClickHandle}
                type={buttonType}
                ref={buttonAnimateRef}
                disabled={disabled}
            >
                {loader ? <Spinner/> : <span>{children ? children : title}</span>}
            </button>
    );
}

export default Button;
