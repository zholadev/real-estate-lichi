'use client'

import React, {useState} from 'react';
import styles from '@/styles/object-page.module.sass'
import {ModalPickUpObject} from "@/shared/uikit/modal";
import DetailInfo from "@/components/object/ui/DetailInfo";
import DetailFeedback from "@/components/object/ui/DetailFeedback";

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
function DetailDescription(props) {
    const {i18n, data} = props

    const [modalSignUp, setModalSighUp] = useState(false)

    const toggleModal = () => setModalSighUp(!modalSignUp)

    return (
        <>
            <div className={styles['object_description']}>
                <DetailInfo
                    data={data?.["description"]}
                />

                <div className={styles['object_feedback_content']}>
                    <div className={styles['feedback_content_sticky']}>
                        <DetailFeedback
                            i18n={i18n}
                            onClick={toggleModal}
                            data={data?.["managers"]}
                        />
                    </div>
                </div>
            </div>
            <ModalPickUpObject
                active={modalSignUp}
                disabled={toggleModal}
                managerData={data?.["managers"]}
            />
        </>
    );
}

export default DetailDescription;
