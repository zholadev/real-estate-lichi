'use client'

import React, {useCallback, useMemo} from 'react';
import {PortalProvider} from "@/shared/portals";
import styles from '@/styles/ui-modal.module.sass'
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function ModalContainer(props) {
    const {active, disabled, onClick, children, closeClickEvent} = props

    const closeHandle = useCallback(() => {
        try {
            disabled()

            if (closeClickEvent) closeClickEvent()
        } catch (error) {
            errorHandler("modalContainer", "closeHandle", error)
        }
    }, [disabled, closeClickEvent])

    const clickEventHandle = useCallback(() => {
        try {
            if (onClick) onClick()
        } catch (error) {
            errorHandler("modalContainer", "closeHandle", error)
        }
    }, [onClick])

    const modalActiveGetStyles = useMemo(() => {
        return {
            "modal": active ? styles['modal_active'] : '',
            "overlay": active ? styles['overlay_active'] : '',
            "content": active ? styles['content_active'] : ''
        }
    }, [active, styles])

    return (
        <PortalProvider>
            <div className={`${styles['modal']} ${modalActiveGetStyles.modal}`}>
                <div className={`${styles['modal_overlay']} ${modalActiveGetStyles.overlay}`}
                     onClick={closeHandle}
                />

                <div className={`${styles['modal_content']} ${modalActiveGetStyles.content}`}>
                    <i className={styles['modal_close']} onClick={closeHandle}/>
                    <div className={styles['content']}>
                        {children}
                    </div>
                </div>
            </div>
        </PortalProvider>
    );
}

export default ModalContainer;
