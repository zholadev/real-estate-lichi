'use client'

import React from 'react';
import {Slide, toast} from "react-toastify";
import {useMediaQuery} from "react-responsive";

/**
 * @author Zholaman Zhumanov
 * @name useToastMessage
 * @last-updated 10.08.2023 - Zholaman Zhumanov
 * @description toast message global options
 * @returns {(function(*): void)|*}
 */
function useToastMessage() {
    const isTypeDevice = useMediaQuery({maxWidth: 1199.98})

    return (message, type) => {
        if (type) {
            toast[type](message, {
                position: isTypeDevice ? 'top-center' : 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                transition: Slide,
            })
        } else {
            toast(message, {
                position: isTypeDevice ? 'top-center' : 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                transition: Slide,
            })
        }

    }
}

export default useToastMessage;
