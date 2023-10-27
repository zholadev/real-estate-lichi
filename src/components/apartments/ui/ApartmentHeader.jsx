import React from 'react';
import styles from '@/styles/apartments-page.module.sass'
import {Video} from "@/shared/uikit/video";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {Button} from "@/shared/uikit/button";
import {ICON, IMG} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentHeader(props) {
    const {i18n, videoSrc, title, description} = props

    return (
        <div className={styles['apartment_header']}>
            <div className={styles['video_box']}>
                <Video src={videoSrc} poster={IMG.posterDubaiApartmentPage['src']}/>
            </div>

            <div className={styles['overlay_box']}>
                <div className={styles['info_sm']}>
                    <h1>{title}</h1>
                    <p>{description}</p>

                    <Button
                        type={'outline_light'}
                        title={'забронирвать'}
                    />
                </div>
            </div>

            <div className={'container_lg h-100'}>
                <div className={styles['info_box']}>
                    <div className={styles['breadcrumbs_box']}>
                        <Breadcrumbs i18n={i18n} page={'apartment'} theme={'light'}/>
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['info']}>
                            <h1>{title}</h1>
                            <p>{description}</p>

                            <Button
                                type={'outline_light'}
                                title={'забронирвать'}
                            />
                        </div>

                        <div className={styles['info_action']}>
                            <Button
                                type={'secondary_dark'}
                            >
                                <div className={'button-children-icon'}><span>3D тур</span> <img
                                    src={ICON.repeatIcon['src']} alt=""/></div>
                            </Button>

                            <Button
                                type={'secondary_dark'}
                            >
                                <div className={'button-children-icon'}><span>Видео о проекте</span> <img
                                    src={ICON.startIcon['src']} alt=""/></div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApartmentHeader;
