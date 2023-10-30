'use client'

import {gsap} from 'gsap'
import React, {useEffect, useRef} from 'react';
import {useMediaMaxState} from "@/shared/hooks";
import styles from '@/styles/ui-accordion.module.sass'

const initialPath = 'M10.5 11.5V22H11.5V11.5H22V10.5H11.5V0H10.5V10.5H0V11.5H10.5Z';
const finalPath = 'M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM29.3536 4.35355C29.5488 4.15829 29.5488 3.84171 29.3536 3.64644L26.1716 0.464464C25.9763 0.269202 25.6597 0.269202 25.4645 0.464464C25.2692 0.659726 25.2692 0.976309 25.4645 1.17157L28.2929 4L25.4645 6.82842C25.2692 7.02369 25.2692 7.34027 25.4645 7.53553C25.6597 7.73079 25.9763 7.73079 26.1716 7.53553L29.3536 4.35355ZM1 4.5L29 4.5L29 3.5L1 3.5L1 4.5Z';

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function AccordionItem(props) {
    const {active, title, content, onClick, contentTab} = props

    const iconVRef = useRef(null)
    const iconHRef = useRef(null)
    const heightItemRef = useRef(null)
    const contentSectionRef = useRef(null)

    const mediaMdQuery = useMediaMaxState({screenSize: 768})

    useEffect(() => {
        if (active) {
            gsap.to(iconHRef.current, {duration: .3, rotate: 0, opacity: .6, delay: .2, ease: 'power2.inOut'})
            gsap.to(iconHRef.current, {duration: .4, delay: .2, width: 30, height: 1, ease: 'power2.inOut'})
        } else {
            gsap.to(iconHRef.current, {
                duration: .3,
                rotate: 90,
                opacity: .6,
                width: 22,
                height: 1,
                ease: 'power2.inOut'
            })
        }
    }, [active]);

    useEffect(() => {
        const element = heightItemRef.current;

        if (contentTab && !mediaMdQuery) return

        gsap.to(element, {
            height: active ? 'auto' : 0,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
                if (active) {
                    element.style.height = 'auto'; // Set height to 'auto' to allow content to expand
                } else {
                    element.style.height = '0px'; // Set height to 'auto' to allow content to expand
                }
            },
        });

        if (active) {
            gsap.to(contentSectionRef.current, {duration: .4, opacity: 1, visibility: 'visible', ease: 'power2.inOut'})
        } else {
            gsap.to(contentSectionRef.current, {duration: .2, opacity: 0, visibility: 'hidden', ease: 'power2.inOut'})
        }
    }, [active, heightItemRef, contentTab, mediaMdQuery]);

    return (
        contentTab ?
            mediaMdQuery ?
                <div className={`${styles['accordion_item']} ${active ? styles['active'] : ''}`}
                     onClick={onClick}>
                    <div className={styles['header']}>
                        <span className={active ? styles['title_active'] : ''}>{title}</span>
                        <div className={styles['accordion_icon']}>
                            <div className={styles['icon_v']} ref={iconVRef}/>
                            <div className={styles['icon_h']} ref={iconHRef}/>
                        </div>
                    </div>
                    <div
                        ref={heightItemRef}
                        style={{height: 0}}
                        className={`${styles['content']}`}>
                        <div ref={contentSectionRef} className={styles['content_section']}>
                            {content}
                        </div>
                    </div>
                </div>
                :
                <div
                    className={`${styles['accordion_item']}`}
                    onClick={onClick}
                >
                    <div className={styles['header']}>
                        <span className={active ? styles['title_active'] : ''}>{title}</span>
                        <div className={styles['accordion_icon']}>
                            <div className={styles['icon_v']} ref={iconVRef}/>
                            <div className={styles['icon_h']} ref={iconHRef}/>
                        </div>
                    </div>
                </div>
            :
            <div className={`${styles['accordion_item']} ${active ? styles['active'] : ''}`} onClick={onClick}>
                <div className={styles['header']}>
                    <span className={active ? styles['title_active'] : ''}>{title}</span>
                    <div className={styles['accordion_icon']}>
                        <div className={styles['icon_v']} ref={iconVRef}/>
                        <div className={styles['icon_h']} ref={iconHRef}/>
                    </div>
                </div>
                <div
                    ref={heightItemRef}
                    style={{height: 0}}
                    className={`${styles['content']}`}>
                    <div dangerouslySetInnerHTML={{__html: content}} className={styles['content_section']}
                         ref={contentSectionRef}/>
                </div>
            </div>
    );
}

export default AccordionItem;
