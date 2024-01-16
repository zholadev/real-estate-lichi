'use client'

import React from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";
import {Button} from "@/shared/uikit/button";
import {Breadcrumbs} from "src/entities/breadcrumbs";
import {ICON} from "@/shared/constants/constants";
import styles from '@/styles/apartments-page.module.sass'

const Video = dynamic(() => import('@/shared/uikit/video/ui/Video'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceHeader(props) {
    const {i18n, videoSrc, title, description, poster} = props

    const router = useRouter()

    return (
        <div className={styles['apartment_header']}>
            <div className={styles['video_box']}>
                <Video
                    src={videoSrc}
                    posterStyle={{height: "100vh"}}
                    poster={poster}/>
            </div>

            <div className={styles['overlay_box']}>
                <div className={styles['info_sm']}>
                    <h1>{title}</h1>
                    <p>{description}</p>

                    <Button
                        type={'outline_light'}
                        title={i18n?.["button.book.title"]}
                    />
                </div>
            </div>

            <div className={'container_lg h-100'}>
                <div className={styles['info_box']}>
                    <div className={styles['breadcrumbs_box']}>
                        <Breadcrumbs i18n={i18n} page={'residence'} theme={'light'} pageName={title}/>
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['info']}>
                            <h1>{title}</h1>
                            <p>{description}</p>

                            <Button
                                type={'outline_light'}
                                title={i18n?.["button.book.title"]}
                            />
                        </div>

                        <div className={styles['info_action']}>
                            <Button
                                type={'secondary_dark'}
                                onClick={() => router.push('https://3dtours.floorplanimaging.com/p/PXeX80XX')}
                            >
                                <div className={'button-children-icon'}>
                                    <span>{i18n?.["button.3d.title"]}</span>
                                    <img src={ICON.repeatIcon['src']} alt=""/>
                                </div>
                            </Button>

                            <Button
                                type={'secondary_dark'}
                            >
                                <div className={'button-children-icon'}>
                                    <span>{i18n?.["button.video.about.title"]}</span>
                                    <img src={ICON.startIcon['src']} alt=""/>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidenceHeader;
