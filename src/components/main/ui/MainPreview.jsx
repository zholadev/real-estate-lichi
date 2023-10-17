import React from 'react';
import styles from '@/styles/main.module.sass'
import {Button} from "@/shared/uikit/button";
import MainBottomList from "./MainBottomList";
import {Video} from "@/shared/uikit/video";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @last-updated 15.10.2023 - Zholaman Zhumanov
 * @update-description video component is added
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainPreview(props) {
    const {i18n} = props

    return (
        <div className={styles['preview']}>
            <div className={styles['preview_title']}><h1>{i18n['main']['welcome']}</h1></div>
            <div className={styles['preview_start']}>
                <Video
                    src={'https://player.vimeo.com/progressive_redirect/playback/872507213/rendition/360p/file.mp4?loc=external&signature=edd2167d8f9773a750ba62f20594fac49bd2510ec214805741b6681a0f2431e9'}/>
                <div className={styles['preview_btn_place']}>
                    <Button
                        type={'outline'}
                        title={i18n?.["site"]?.["get_object"]}
                        style={{minWidth: '268px'}}
                        url={'/catalog'}
                    />
                </div>
            </div>
            <MainBottomList i18n={i18n}/>
        </div>
    );
}

export default MainPreview;
