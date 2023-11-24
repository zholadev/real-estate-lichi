'use client'

import React, {useCallback, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from '@/styles/apartments-page.module.sass'

import 'swiper/css';
import {Autoplay} from "swiper/modules";
import {ConstructorHtml} from "@/entities/constructorHtml";
import {mediaImgSrc} from "@/shared/constants/options";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceDesignSwiper(props) {
    const {i18n, info} = props

    const [swiper, setSwiper] = useState(null)
    const [swiperActiveIndex, setSwiperActiveIndex] = useState(1)

    const nextHandle = useCallback(() => {
        try {
            swiper.slideNext()
        } catch (error) {
            console.log(`page: apartmentDesignSwiper, event: nextHandle, error: ${error}`)
        }
    }, [swiper])

    const prevHandle = useCallback(() => {
        try {
            swiper.slidePrev()
        } catch (error) {
            console.log(`page: apartmentDesignSwiper, event: prevHandle, error: ${error}`)
        }
    }, [swiper])

    // useEffect(() => {
    //     try {
    //         if (swiper) {
    //             setSwiperActiveIndex(swiper.activeIndex)
    //         }
    //     } catch (error) {
    //         console.log(`page: apartmentDesignSwiper, event: useEffect, error: ${error}`)
    //     }
    //
    // }, [swiperActiveIndex, swiper]);

    return (
        <div className={styles['design_gallery_swiper']}>
            <div className={styles['content']}>
                <div className={styles['content_info']}>
                    <ConstructorHtml jsonHtmlData={info?.["description"] || []}/>
                </div>

                <div className={styles['content_swiper']}>
                    <Swiper
                        loop={false}
                        slidesPerView={1}
                        speed={500}
                        modules={[Autoplay]}
                        autoplay={{
                            pauseOnMouseEnter: true,
                            delay: 3000
                        }}
                        onSwiper={swiper => setSwiper(swiper)}
                        onSlideChange={swiper => {
                            setSwiperActiveIndex(swiper.activeIndex + 1)
                        }}
                    >

                        {
                            Object.values(info?.["images"]?.["data"] || {}).map((swiperItem, swiperId) => {
                                return (
                                    <SwiperSlide key={swiperId}>
                                        <div className={styles['swiper_slider_content']}>
                                            <img
                                                src={mediaImgSrc(`${swiperItem?.["attributes"]?.["url"]}`)}
                                                alt={info?.["name"]}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>

                    <div className={styles['swiper_action_place']}>
                        <i className={`${styles['icon']} ${styles['icon_left']}`} onClick={prevHandle}/>
                        <div className={styles['action_count']}>
                            {swiperActiveIndex} / {Object.values(info?.["images"]?.["data"] || {}).length}
                        </div>
                        <i className={`${styles['icon']} ${styles['icon_right']}`} onClick={nextHandle}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidenceDesignSwiper;
