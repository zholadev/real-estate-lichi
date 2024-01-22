'use client'

import React from 'react';
import {Button} from "@/shared/uikit/button";
import {Input} from "@/shared/uikit/form/input";
import {useMediaMaxState} from "@/shared/hooks";
import styles from "@/styles/object-page.module.sass";
import ModalContainer from "./container/ModalContainer";
import DetailFeedback from "@/components/object/ui/DetailFeedback";

/**
 * @author Zholaman Zhumanov
 * @created 22.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ModalPickUpObject(props) {
    const {active, disabled, objectName, i18n, managerData} = props

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const InputBox = ({label, value, disabled}) => (
        <div className={styles['form_box']}>
            <Input
                label={label}
                value={value}
                disabled={disabled}
            />
        </div>
    );


    return (
        <ModalContainer
            active={active}
            disabled={disabled}
        >
            <div className={styles['object_sign_up_modal']}>
                <form className={styles['request_form']}>
                    {objectName && <InputBox label={i18n?.["form.name.title"]} value={objectName} disabled={true}/>}
                    <InputBox label={'First name'}/>
                    <InputBox label={'Last name'}/>
                    <InputBox label={i18n?.["form.email.title"]}/>
                    <InputBox label={i18n?.["form.phone.title"]}/>

                    <Button
                        title={i18n?.["form.send.title"]}
                        style={{
                            minWidth: "100%"
                        }}
                    />
                </form>
                {
                    !mediaQuerySm && managerData &&
                    <DetailFeedback
                        hideButton
                        i18n={i18n}
                        typeCard={'secondary'}
                        data={managerData}
                    />
                }
            </div>
        </ModalContainer>
    );
}

export default ModalPickUpObject;
