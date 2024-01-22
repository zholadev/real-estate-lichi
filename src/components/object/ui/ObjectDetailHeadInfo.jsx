'use client'

import React, {useState} from 'react';
import {Button} from "@/shared/uikit/button";
import {useCurrencyFormat} from "@/shared/hooks";
import styles from '@/styles/object-page.module.sass'
import {ModalPickUpObject} from "@/shared/uikit/modal";
import {extractAttribute} from "@/shared/utilites";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @last-updated 09.01.2024
 * @update-description minor refactoring
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailHeadInfo(props) {
    const {i18n, data} = props
    const convertCurrency = useCurrencyFormat()

    const [modalSignUp, setModalSighUp] = useState(false)

    const toggleModal = () => setModalSighUp(!modalSignUp)

    // Extracted function for generating list items
    const generateListItem = (key, value) => (
        <li className={styles['characters_item']} key={value}>
            <span className={styles['key']}>{key}</span>
            <span className={styles['value']}>{value}</span>
        </li>
    );

    return (
        <div className={styles['preview_head_info']}>
            <h1 className={styles['title']}>{data?.["name"]}</h1>
            <ul className={styles['preview_head_characters']}>
                {generateListItem(i18n?.["characters"]?.["price"], `${convertCurrency(data?.["price"])} $`)}

                {
                    Object.values(data?.["build_info"] || {}).map((info, id) =>
                        generateListItem(info?.["name"], info?.["description"])
                    )
                }

                {data?.["residence"]?.["name"] && generateListItem(i18n?.["characters"]?.["resident_complex"], data?.["residence"]?.["name"])}

                {data?.["district"] && generateListItem(i18n?.["characters"]?.["area"], data?.["district"]?.["name"])}

                {data?.["rooms"] && generateListItem("Rooms", data?.["rooms"]?.["name"])}

                {data?.["country"] && generateListItem("Country", data?.["country"]?.["country_name"])}
            </ul>
            <Button
                title={i18n?.["object"]?.["sign_up_view"]}
                onClick={toggleModal}
            />

            <ModalPickUpObject
                i18n={i18n}
                active={modalSignUp}
                disabled={toggleModal}
                managerData={data?.["managers"]}
                objectName={extractAttribute("name", data, true)}
            />
        </div>
    );
}

export default ObjectDetailHeadInfo;
