'use client'

import React from 'react';
import ReactPlayer from "react-player";

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Video(props) {
    const {src, style, poster} = props
    return (
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
        />
    );
}

export default Video;
