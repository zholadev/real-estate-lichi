'use client'

import React, {useCallback, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from '@/styles/apartments-page.module.sass'

import 'swiper/css';
import {Autoplay} from "swiper/modules";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ApartmentDesignSwiper(props) {
    const {sliderContent, i18n} = props

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
                    <p>
                        Интерьеры The Highbury приветствуют вас при каждом общении. Палитра материалов создана так,
                        чтобы привнести ощущение тепла и уникальную, но в то же время знакомую атмосферу, которая
                        заставляет вас сразу почувствовать себя как дома. Внутри естественная цветовая палитра с тонкими
                        мерцаниями металлического освещения, контролирующего помещения. Среди натурального дерева и
                        камня, а также красиво выполненной мебели жители имеют идеальный фон для создания уникального
                        дома.
                    </p>

                    <p>
                        Дерево является центром внимания в центре захватывающего дух атриума двойной высоты Хайбери.
                        Размещенный в застекленной витрине, он отражает переплетение природы, лежащее в основе дизайна
                        здания. Среди слегка промасленного дерева и коллекции растений восстановленная отделка и
                        материалы отсылают к местной флоре и фауне. А сквозь листья монолитная плавающая стойка
                        регистрации встречает жильцов и их гостей теплотой семейного дома, приглашая их посидеть и
                        расслабиться среди его успокаивающей обстановки.
                    </p>
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
                            sliderContent.map((swiperItem, swiperId) => {
                                return (
                                    <SwiperSlide key={swiperId}>
                                        <div className={styles['swiper_slider_content']}>
                                            <img src={swiperItem?.['img']} alt=""/>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>

                    <div className={styles['swiper_action_place']}>
                        <i className={`${styles['icon']} ${styles['icon_left']}`} onClick={prevHandle}/>
                        <div className={styles['action_count']}>
                            {swiperActiveIndex} / {sliderContent.length}
                        </div>
                        <i className={`${styles['icon']} ${styles['icon_right']}`} onClick={nextHandle}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApartmentDesignSwiper;
