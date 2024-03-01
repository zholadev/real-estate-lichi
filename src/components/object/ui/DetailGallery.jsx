

import React, {useState} from 'react';
import 'swiper/css';
import Image from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';
import {ZoomContainer} from "@/shared/uikit/zoom";
import styles from '@/styles/object-page.module.sass'
import {mediaImgSrc} from "@/shared/constants/options";
import {Autoplay, FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @last-updated 18.01.2024 - Zholaman Zhumanov
 * @update-description
 * @param props
 * @returns {Element}
 * @constructor
 */
function DetailGallery(props) {
    const {galleryImages, name} = props

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    return (
        <div className={styles['preview_gallery']} style={{display: "block"}}>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[Thumbs, FreeMode, Autoplay, Navigation]}
                navigation={true}
                autoHeight={true}
                autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 3000
                }}
                className="preview-gallery-swiper-main"
            >
                {
                    Object.values(galleryImages?.["item"]?.["data"] || {}).map((photoItem, photoId) => {
                        return (
                            <SwiperSlide key={photoId}>
                                <ZoomContainer>
                                    <Image
                                        src={mediaImgSrc(photoItem?.["attributes"]?.["url"])}
                                        alt={name}
                                        priority={true}
                                        width={1024}
                                        height={768}
                                    />
                                </ZoomContainer>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={mediaQuerySm ? 3.5 : 4.5}
                freeMode={true}
                autoHeight={true}
                watchSlidesProgress={true}
                modules={[Thumbs, FreeMode, Navigation, Pagination]}
                pagination={true}
                navigation={true}
                className="preview-gallery-swiper-thumbs"
            >
                {
                    Object.values(galleryImages?.["item"]?.["data"] || {}).map((photoItem, photoId) => {
                        return (
                            <SwiperSlide key={photoId}>
                                <Image
                                    src={mediaImgSrc(photoItem?.["attributes"]?.["url"])}
                                    alt={name}
                                    priority={true}
                                    width={576}
                                    height={693}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}

export default DetailGallery;
