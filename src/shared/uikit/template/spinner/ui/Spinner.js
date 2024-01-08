'use client'

import React from 'react'

/**
 * @author Zholaman Zhumanov
 * @name spinner
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Spinner(props) {
    const {width = 20, height = 20, bg, strokeWidth = 9} = props

    return (
        <div className="w-100 d-flex justify-content-center align-items-center">
            <div style={{width: width, height: height}}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke={bg ? `${bg}` : '#a4a4a4'}
                        strokeWidth={strokeWidth} r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                        transform="rotate(341.914 50.0001 50)"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                        />
                    </circle>
                </svg>
            </div>
        </div>
    )
}

export default Spinner;
