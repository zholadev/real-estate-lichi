'use client'

import {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";

/**
 * @author Zholaman Zhumanov
 * @name useMediaMaxState
 * @description get max-width media query
 * @param screenSize
 * @returns {boolean}
 */
function useMediaMaxState({screenSize}) {
    const [mediaState, setMediaState] = useState(false)

    const mediaQuery = useMediaQuery({maxWidth: screenSize})

    useEffect(() => {
        setMediaState(mediaQuery)

        return () => {
            setMediaState(false)
        }
    }, [mediaQuery])

    return mediaState
}

export default useMediaMaxState;
