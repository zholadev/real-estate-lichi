import React from 'react';
import FooterContent from "@/widgets/footer/ui/FooterContent";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @last-updated 08.12.2023
 * @update-description footer remove in client
 * @param props
 * @returns {Element}
 * @constructor
 */
function Footer(props) {
    const {i18n} = props

    return <FooterContent i18n={i18n}/>
}

export default Footer;
