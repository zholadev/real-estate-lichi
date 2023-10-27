'use client'

import React from 'react';
import {Video} from "@/shared/uikit/video";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import styles from '@/styles/customer_content.module.sass'

function CustomHeaderVideo(props) {
    const {videoSrc, page, centerText, i18n, poster, img} = props

    return (
        <div className={styles['header_video']}>
            <div className={'container_md'}>
                <Breadcrumbs i18n={i18n} page={page}/>
            </div>

            <div className={styles['media_box']}>
                {
                    img ?
                        <div className={styles['img_bg']} style={{backgroundImage: `url(${img})`}}/>
                        :
                        <Video src={videoSrc} poster={poster}/>
                }
            </div>

            <div className={styles['center_content']}>
                <h1 className={styles['title']}>{centerText}</h1>
            </div>
        </div>
    );
}

export default CustomHeaderVideo;
