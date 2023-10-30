'use client'

import React, {useRef, useState} from 'react';
import ReactPlayer from "react-player";
import styles from '@/styles/ui-video.module.sass'

// TODO: Gsap animation

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Video(props) {
    const {src, style, poster} = props

    const posterRef = useRef(null)

    const [videoIsPlay, setVideoIsPlay] = useState(false)

    return (
        <div className={styles['video_container']}>
            {
                poster &&
                <div className={`${styles['video_poster_box']} ${videoIsPlay ? styles['hide'] : ''}`} ref={posterRef}>
                    <img src={poster} alt="poster"/>
                </div>
            }
            <ReactPlayer
                url={src}
                style={style}
                width={'100%'}
                height={'100%'}
                loop={true}
                playsinline={true}
                controls={false}
                muted
                playing={true}
                autoPlay={true}
                onReady={() => {
                    setVideoIsPlay(true)
                }}
                onError={() => setVideoIsPlay(false)}
            />
        </div>
    );
}

export default Video;
