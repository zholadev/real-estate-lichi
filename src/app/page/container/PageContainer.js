import React from 'react';
import Head from "next/head";
import {usePathname} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

/**
 * @author Zholaman Zhumanov
 * @created 27.03.2024
 * @param props
 * @return {Element}
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
        <>
            <Head>
                <title>Meta Trust Dubai</title>
            </Head>

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
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default PageContainer;
