'use client'

import React, {useState} from 'react';
import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Thumbs, FreeMode, Autoplay, Navigation, Pagination} from 'swiper/modules';
import {IMG} from "@/shared/constants/constants";
import styles from '@/styles/object-page.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectDetailGallery(props) {
    const {galleryData} = props

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles['preview_gallery']} style={{display: "block"}}>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Thumbs, FreeMode, Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 3000
                }}
                className="preview-gallery-swiper-main"
            >
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4.5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Thumbs, FreeMode, Navigation, Pagination]}
                pagination={true}
                navigation={true}
                className="preview-gallery-swiper-thumbs"
            >
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMG.templateSwiperImg['src']}/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default ObjectDetailGallery;
