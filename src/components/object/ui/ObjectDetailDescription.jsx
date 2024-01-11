'use client'

import React, {useState} from 'react';
import styles from '@/styles/object-page.module.sass'
import ObjectDetailInfo from "@/components/object/ui/ObjectDetailInfo";
import ObjectDetailFeedback from "@/components/object/ui/ObjectDetailFeedback";
import {ModalContainer} from "@/shared/uikit/modal";
import {extractAttribute} from "@/shared/utilites";
import {Button} from "@/shared/uikit/button";
import {Input} from "@/shared/uikit/form/input";
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @last-updated 11.01.2024 - Zholaman Zhumanov
 * @update-description form modal is adding
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailDescription(props) {
    const {i18n, data} = props

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const [modalSignUp, setModalSighUp] = useState(false)

    const toggleModal = () => setModalSighUp(!modalSignUp)

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
        <div className={styles['object_description']}>
            <ObjectDetailInfo
                data={data?.["description"]}
            />
            <ObjectDetailFeedback
                i18n={i18n}
                onClick={toggleModal}
                data={data?.["managers"]}
            />

            <ModalContainer
                active={modalSignUp}
                disabled={toggleModal}
            >
                <div className={styles['object_sign_up_modal']}>
                    <form className={styles['request_form']}>
                        <InputBox label={'First name'}/>
                        <InputBox label={'Last name'}/>
                        <InputBox label={i18n?.["form.email.title"]}/>
                        <InputBox label={i18n?.["form.phone.title"]}/>

                        <Button
                            type={'outline'}
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

export default ObjectDetailDescription;
