import React, {useMemo} from 'react';
import {useInView} from "react-intersection-observer";
import styles from '@/styles/ui-animation.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 11.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function Animation(props) {
    const {
        isIntersection,
        animateType = 'slide_up',
        tag = 'div',
        children,
        threshold = 0.1,
        triggerAnimate,
        style,
        dontRepeat = false
    } = props

    const tagSet = {
        tag: tag
    }

    const [intersectionRef, inView] = useInView({threshold: threshold, triggerOnce: dontRepeat})

    const isPlayAnimate = useMemo(() => {
        return !!inView && isIntersection || triggerAnimate
    }, [inView, isIntersection, triggerAnimate])

    return (
        <tagSet.tag
            ref={intersectionRef}
            className={`${styles[`${animateType}__init`]} ${isPlayAnimate ? styles[`${animateType}__play`] : ''}`}
            style={style}
        >
            {children}
        </tagSet.tag>
    );
}

export default Animation;
