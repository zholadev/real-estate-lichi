

import React from 'react';
import {motion} from 'framer-motion'
import styles from '@/styles/ui-tabs.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 20.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MotionTextUnderLine(props) {
    const {current, id, style} = props

    return (
        current === id &&
        <motion.div
            layoutId={'borderBottom'}
            style={{
                width: "100%",
                height: "2px",
                position: "absolute",
                bottom: "-4.1px",
                left: 0,
                display: "block",
                borderRadius: '5px',
                backgroundColor: "rgba(22, 24, 29, 1)",
                ...style
            }}
        />
    );
}

export default MotionTextUnderLine;
