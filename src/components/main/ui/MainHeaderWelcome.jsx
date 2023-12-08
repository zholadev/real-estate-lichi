'use client'

import React from 'react';
import styles from '@/styles/main.module.sass'
import {Button} from "@/shared/uikit/button";
import MainBottomList from "./MainBottomList";
import {IMG} from "@/shared/constants/constants";
import dynamic from "next/dynamic";

const Video = dynamic(() => import('@/shared/uikit/video/ui/Video'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @last-updated 15.10.2023 - Zholaman Zhumanov
 * @update-description video component is added
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainHeaderWelcome(props) {
    const {i18n} = props

    return (
        <section className={styles['preview']}>
            <div className={styles['preview_title']}><h1>{i18n['main']['welcome']}</h1></div>
            <div className={styles['preview_start']}>
                <figure>
                    <Video
                        src={'https://player.vimeo.com/progressive_redirect/playback/877839534/rendition/720p/file.mp4?loc=external&signature=789b1251249677aa4c66d5a8f5b83ebe86ec85ad25af29fdb87a696fdd20f74a'}
                        poster={IMG.posterDubaiMain['src']}
                    />
                </figure>
                <div className={styles['preview_btn_place']}>
                    <Button
                        type={'outline_light'}
                        title={i18n?.["site"]?.["get_object"]}
                        style={{minWidth: '268px'}}
                        url={'/catalog'}
                    />
                </div>
            </div>
            <MainBottomList i18n={i18n}/>
        </section>
    );
}

export default MainHeaderWelcome;
