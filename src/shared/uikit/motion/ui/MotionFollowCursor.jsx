

import React, {useEffect, useRef, useState} from 'react';
import {gsap} from "gsap";
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 27.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MotionFollowCursor(props) {
    const {children} = props

    const imgPreviewRef = useRef(null);
    const previewOverlayRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        gsap.to(imgPreviewRef.current, { x: 20, duration: 0.3 });
        gsap.to(previewOverlayRef.current, { opacity: 0.7, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        gsap.to(imgPreviewRef.current, { x: 0, duration: 0.3 });
        gsap.to(previewOverlayRef.current, { opacity: 0, duration: 0.3 });
    };


    return (
        <li className={styles.list_item}>
            <Link to={item.url} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={styles.title}>{item.title}</div>
            </Link>
            <div className={styles.img_preview} ref={imgPreviewRef}>
                <div className={styles.preview_overlay} ref={previewOverlayRef}></div>
                <img src={item.img} alt="" />
            </div>
        </li>
    );
}

export default MotionFollowCursor;
