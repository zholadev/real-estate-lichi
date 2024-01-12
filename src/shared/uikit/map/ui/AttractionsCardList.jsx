import React, {useCallback, useMemo, useState} from 'react';
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import {Swiper, SwiperSlide} from "swiper/react";
import {extractAttribute} from "@/shared/utilites";
import styles from "@/styles/object-page.module.sass";
import {mediaImgSrc} from "@/shared/constants/options";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {Animation} from "@/shared/uikit/animation";

/**
 * @author Zholaman Zhumanov
 * @created 10.01.2024
 * @last-updated 11.01.2024
 * @update-description refactoring and slideToHandle created
 * @param props
 * @returns {Element}
 * @constructor
 */
function AttractionsCardList(props) {
    const {getPositionHandle, currentData, componentData, sliderCardCountView = 4.2} = props

    const [swiper, setSwiper] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const mediaQuerySm = useMediaQuery({maxWidth: 576.98})
    const mediaQueryMd = useMediaQuery({minWidth: 577, maxWidth: 1024})

    console.log(swiper)

    const slideToHandle = useCallback((id) => {
        try {
            swiper.slideTo(id)
        } catch (error) {
            errorHandler("attractionCardList", "slideToHandle", error)
        }
    }, [swiper])

    const sliderSetData = useMemo(() => {
        try {
            return [
                {
                    id: 0,
                    attributes: {
                        ...currentData,
                        photo: componentData.defaultCoordinatePhoto
                    }
                },
                ...componentData.attractionsData,
            ]
        } catch (error) {
            errorHandler("attractionsList", "sliderSetData", error)
        }
    }, [currentData, componentData])

    console.log(sliderSetData, activeIndex)

    return (
        <div className={styles['map_card_container']}>
            <Swiper
                centeredSlides={true}
                onSwiper={swiper => setSwiper(swiper)}
                slidesPerView={mediaQuerySm ? 1.2 : mediaQueryMd ? 2.2 : sliderCardCountView}
                onSlideChange={swiper => {
                    setSwiper(swiper)
                    setActiveIndex(swiper.activeIndex)
                }}
            >
                {
                    sliderSetData.map((location, index) => {
                        return (
                            <SwiperSlide key={location?.["id"]}>
                                <Animation
                                    isIntersection
                                    dontRepeat
                                    style={{transitionDelay: index * 0.0124 + 's'}}
                                >
                                    <div
                                        className={`${styles['card_box']} ${activeIndex === index ? styles['card_active_item'] : ''}`}
                                        onClick={() => {
                                            slideToHandle(index)
                                            getPositionHandle([extractAttribute("coordinates.coordinates.lat", location), extractAttribute("coordinates.coordinates.lng", location)])
                                        }}
                                    >
                                        <Image
                                            width={200}
                                            height={300}
                                            priority={true}
                                            className={styles['picture_bg']}
                                            alt={extractAttribute("name", location)}
                                            src={mediaImgSrc(`${extractAttribute("photo.data.attributes.url", location) || extractAttribute("photo.data.0.attributes.url", location)}`)}
                                        />
                                        <div className={styles['overlay']}/>
                                        <div className={styles['info']}>
                                            {
                                                extractAttribute("icon.data.attributes.url", location) &&
                                                <i className={styles['icon']}
                                                   style={{backgroundImage: `url(${mediaImgSrc(`${extractAttribute("icon.data.attributes.url", location)}`)})`}}
                                                />
                                            }
                                            <span>{extractAttribute("name", location)}</span>
                                        </div>
                                    </div>
                                </Animation>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}

export default AttractionsCardList;
