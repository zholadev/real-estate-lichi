import React from 'react';
import {AboutPage} from "@/components/about";
import {globalProps} from "@/entities/globalProps";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
export default function Index(props) {
    const {i18n} = props

    return <AboutPage i18n={i18n}/>;
}

export async function getServerSideProps(context) {
    return {
        props: {
            ...await globalProps(context)
        }
    }
}
