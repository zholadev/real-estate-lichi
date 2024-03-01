

import React from 'react';
import {useDispatchHandler} from "@/shared/hooks";
import styles from '@/styles/object-page.module.sass'
import DetailInfo from "@/components/object/ui/DetailInfo";
import DetailFeedback from "@/components/object/ui/DetailFeedback";
import ModalSignUpViewing from "@/shared/uikit/modal/ui/ModalSignUpViewing";

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

    const events = useDispatchHandler()

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
                            onClick={events.openModalSignUpViewingHandler}
                            data={data?.["managers"]}
                        />
                    </div>
                </div>
            </div>
            <ModalSignUpViewing
                i18n={i18n}
                managerData={data?.["managers"]}
            />
        </>
    );
}

export default DetailDescription;
