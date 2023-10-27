'use client'

import React from 'react';
import NavbarContent from "@/widgets/navbar/ui/NavbarContent";

// TODO: refac

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Navbar(props) {
    const {i18n} = props

    return (<NavbarContent i18n={i18n}/>);
}

export default Navbar;
