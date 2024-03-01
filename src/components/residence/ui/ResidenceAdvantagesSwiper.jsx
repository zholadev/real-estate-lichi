

import React, {useCallback, useMemo, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from '@/styles/apartments-page.module.sass'

import 'swiper/css'
import Image from "next/image";
import {Autoplay} from "swiper/modules";
import {useMediaQuery} from "react-responsive";
import {ZoomContainer} from "@/shared/uikit/zoom";
import {mediaImgSrc} from "@/shared/constants/options";


/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ResidenceAdvantagesSwiper(props) {
    const {data = []} = props

    const mediaLgQuery = useMediaQuery({minWidth: 993, maxWidth: 1440})
    const mediaMdQuery = useMediaQuery({minWidth: 769, maxWidth: 992.98})
    const mediaSmQuery = useMediaQuery({maxWidth: 768.98})

    const [swiper, setSwiper] = useState(null)
    const [swiperActiveSlide, setSwiperActiveSlide] = useState(1)

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

    const getProgressCount = useMemo(() => {
        try {
            const getCount = swiperActiveSlide / data?.length
            return getCount * 100
        } catch (error) {
            console.log(`page: page, event: getProgressCount, error: ${error}`)
        }
    }, [swiperActiveSlide, data])


    return (
        <div className={styles['advantages_swiper']}>
            <Swiper
                // loop={true}
                spaceBetween={mediaLgQuery ? 45 : mediaMdQuery ? 30 : mediaSmQuery ? 10 : 60}
                speed={700}
                centeredSlides={mediaSmQuery ? false : 'auto'}
                slidesPerView={mediaSmQuery ? 1.3 : 2.3}
                onSlideChange={(swiper) => setSwiperActiveSlide(swiper.activeIndex + 1)}
                onSwiper={(swiper) => setSwiper(swiper)}
                className={'apartments-advantages-swiper'}
                modules={[Autoplay]}
                autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 3000
                }}
            >
                {
                    Object.values(data || {}).map((image, id) => {
                        return (
                            <SwiperSlide key={id}>
                                {({isActive}) => (
                                    <ZoomContainer>
                                        <Image
                                            src={mediaImgSrc(image?.["attributes"]?.["url"])}
                                            alt={''}
                                            priority={true}
                                            width={1024}
                                            height={768}
                                            className={isActive ? styles['swiper_active_block'] : []}
                                        />
                                    </ZoomContainer>
                                )}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            <div className={'container_md'}>
                <div className={styles['swiper_action']}>
                    <div className={styles['swiper_fraction']}>
                        <i className={`${styles['icon']} ${styles['icon_left']}`} onClick={prevHandle}/>
                        <div className={styles['fraction_count']}>
                            <div>{swiperActiveSlide}</div>
                            <div className={styles['divide_slash']}>/</div>
                            <div>{data.length}</div>
                        </div>
                        <i className={`${styles['icon']} ${styles['icon_right']}`} onClick={nextHandle}/>
                    </div>
                    <div className={styles['swiper_line']}>
                        <div className={styles['line_progress']} style={{width: `${getProgressCount}%`}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidenceAdvantagesSwiper;
