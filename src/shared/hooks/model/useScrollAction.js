'use client'

import React, {useEffect, useState} from 'react';

/**
 * @author Zholaman Zhumanov
 * @name useScrollAction
 * @description get scroll position
 * @param props
 * @returns {boolean}
 */
function useScrollAction({position}) {
    const [scrollBottom, setScroll] = useState(false)

    useEffect(() => {
        console.log(window.scrollY)
        const scrollDown = () => {
            try {
                if (window.scrollY > position) {
                    setScroll(true)
                } else {
                    setScroll(false)
                }
            } catch (error) {
                console.log(`page: useScrollAction, event: useScrollAction, error: ${error}`)
            }
        }

        scrollDown()
        window.addEventListener('scroll', scrollDown)

        return () => {
            window.removeEventListener('scroll', scrollDown)
            setScroll(false)
        }
    }, [position])

    return scrollBottom
}

export default useScrollAction;
