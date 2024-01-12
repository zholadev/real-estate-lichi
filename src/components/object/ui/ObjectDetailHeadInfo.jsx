'use client'

import React, {useState} from 'react';
import styles from '@/styles/object-page.module.sass'
import {Button} from "@/shared/uikit/button";
import {useCurrencyFormat, useMediaMaxState} from "@/shared/hooks";
import {ModalContainer} from "@/shared/uikit/modal";
import {Input} from "@/shared/uikit/form/input";
import {extractAttribute} from "@/shared/utilites";
import ObjectDetailFeedback from "@/components/object/ui/ObjectDetailFeedback";

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

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const [modalSignUp, setModalSighUp] = useState(false)

    const toggleModal = () => setModalSighUp(!modalSignUp)

    // Extracted function for generating list items
    const generateListItem = (key, value) => (
        <li className={styles['characters_item']} key={value}>
            <span className={styles['key']}>{key}</span>
            <span className={styles['value']}>{value}</span>
        </li>
    );

    const InputBox = ({ label, value, disabled }) => (
        <div className={styles['form_box']}>
            <Input
                label={label}
                value={value}
                disabled={disabled}
            />
        </div>
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

            <ModalContainer
                active={modalSignUp}
                disabled={toggleModal}
            >
                <div className={styles['object_sign_up_modal']}>
                    <form className={styles['request_form']}>
                        <InputBox label={i18n?.["form.name.title"]} value={extractAttribute("name", data, true)} disabled={true} />
                        <InputBox label={'First name'} />
                        <InputBox label={'Last name'} />
                        <InputBox label={i18n?.["form.email.title"]} />
                        <InputBox label={i18n?.["form.phone.title"]} />

                        <Button
                            title={i18n?.["form.send.title"]}
                            style={{
                                minWidth: "100%"
                            }}
                        />
                    </form>
                    {
                        !mediaQuerySm &&
                        <ObjectDetailFeedback
                            hideButton
                            i18n={i18n}
                            typeCard={'secondary'}
                            data={data?.["managers"]}
                        />
                    }
                </div>
            </ModalContainer>
        </div>
    );
}

export default ObjectDetailHeadInfo;
