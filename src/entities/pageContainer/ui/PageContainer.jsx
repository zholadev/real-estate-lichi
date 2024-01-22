'use client'

import React from 'react';
import {usePathname} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

/**
 * @author Zholaman Zhumanov
 * @created 22.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function PageContainer(props) {
    const {children} = props

    const pathname = usePathname()

    const variants = {
        inactive: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: 'easeInOut'
            },
        },
        out: {
            opacity: 0,
            y: -100,
            transition: {
                duration: .2,
                ease: 'easeInOut'
            }
        },
        in: {
            y: 100,
            opacity: 0,
            transition: {
                duration: 1,
                ease: 'easeInOut'
            }
        },
    };

    return (
        <AnimatePresence
            initial={false}
            mode={"wait"}
        >
            <motion.div
                key={pathname}
                variants={variants}
                initial="in"
                animate="inactive"
                exit="out"
                className="page_top_size"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default PageContainer;
