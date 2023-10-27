'use client'

import React, {useRef} from 'react';
import {gsap} from "gsap";
import styles from "@/styles/widget-submenu-navbar.module.sass";
import Link from "next/link";

/**
 * @author Zholaman Zhumanov
 * @created 27.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function NavbarMenuItem(props) {
    const {item, onClick} = props

    const imgPreviewRef = useRef(null);
    const textPreviewRef = useRef(null)

    const handleMouseEnter = (e) => {
        const rect = imgPreviewRef.current.getBoundingClientRect();

        gsap.to(imgPreviewRef.current, {
            x: e.clientX - imgPreviewRef.current.getBoundingClientRect().left,
            y: e.clientY - imgPreviewRef.current.getBoundingClientRect().top,
            duration: 0.3,
            stagger: .3,
            // ease: "power2.out"
        });

        gsap.to(textPreviewRef.current, {
            fontWeight: 500,
            duration: .1,
        })
    };

    const handleMouseLeave = () => {
        gsap.to(imgPreviewRef.current, {
            x: 0,
            y: 0,
            duration: 0.3,
            stagger: .1,
            // ease: "power2.out"
        });

        gsap.to(textPreviewRef.current, {
            fontWeight: 400,
            duration: .1,
        })
    };

    return (
        <div onClick={onClick}>
            <li className={styles['list_item']}
                onMouseMove={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Link href={item.url}>
                    <div className={styles['title']} ref={textPreviewRef}>{item.title}</div>
                </Link>
            </li>
            <div className={styles['img_preview']} ref={imgPreviewRef}>
                <div className={styles['preview_overlay']}></div>
                <img src={item.img} alt=""/>
            </div>
        </div>
    );
}

export default NavbarMenuItem;
