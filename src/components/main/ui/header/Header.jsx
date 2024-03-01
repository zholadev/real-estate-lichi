

import React from 'react';
import dynamic from "next/dynamic";
import {Button} from "@/shared/uikit/button";
import styles from '@/styles/main.module.sass'
import {useMediaMaxState} from "@/shared/hooks";
import {urls} from "@/shared/constants/options";
import {IMG} from "@/shared/constants/constants";

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
function Header(props) {
    const {i18n} = props

    const mediaQuerySm = useMediaMaxState({screenSize: 576})

    return (
        <section className={styles['preview']}>
            <div className={styles['preview_title']}>
                <h1>{i18n?.['main']?.['welcome']}</h1>
            </div>

            <div className={styles['preview_start']}>
                <figure>
                    <Video
                        isBorderRadius
                        src={urls.main_page_vimeo}
                        posterStyle={{borderRadius: '4px'}}
                        poster={mediaQuerySm ? IMG.posterDubaiMainSm['src'] : IMG.posterDubaiMain['src']}
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
        </section>
    );
}

export default Header;
