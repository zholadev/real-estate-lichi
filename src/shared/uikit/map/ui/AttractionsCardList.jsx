import React, {useCallback, useState} from 'react';
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

    const mediaQuerySm = useMediaQuery({maxWidth: 576.98})
    const mediaQueryMd = useMediaQuery({minWidth: 577, maxWidth: 1024})

    const slideToHandle = useCallback((id) => {
        try {
            swiper.slideTo(id)
        } catch (error) {
            errorHandler("attractionCardList", "slideToHandle", error)
        }
    }, [swiper])

    return (
        <div className={styles['map_card_container']}>
            <Swiper
                loop={true}
                slidesPerView={mediaQuerySm ? 1.2 : mediaQueryMd ? 2.2 : sliderCardCountView}
                onSwiper={swiper => setSwiper(swiper)}
            >
                <SwiperSlide>
                    <Animation
                        isIntersection
                        dontRepeat
                        style={{transitionDelay: 1 * 0.0120 + 's'}}
                    >
                        <div className={styles['card_box']}
                             onClick={() => {
                                 slideToHandle(0)
                                 getPositionHandle(componentData.defaultCoordinate)
                             }}
                        >
                            <Image
                                width={200}
                                height={300}
                                priority={true}
                                className={styles['picture_bg']}
                                alt={extractAttribute("name", currentData, true)}
                                src={mediaImgSrc(`${extractAttribute("data.0.attributes.url", componentData.defaultCoordinatePhoto, true)}`)}
                            />
                            <div className={styles['overlay']}/>
                            <div className={styles['info']}>
                                <span>{extractAttribute("name", currentData, true)}</span>
                            </div>
                        </div>
                    </Animation>
                </SwiperSlide>
                {
                    componentData.attractionsData.map((location, index) => {
                        return (
                            <SwiperSlide key={location?.["id"]}>
                                <Animation
                                    isIntersection
                                    dontRepeat
                                    style={{transitionDelay: index * 0.0124 + 's'}}
                                >
                                    <div
                                        className={styles['card_box']}
                                        onClick={() => {
                                            slideToHandle(index + 1)
                                            getPositionHandle([extractAttribute("coordinates.coordinates.lat", location), extractAttribute("coordinates.coordinates.lng", location)])
                                        }}
                                    >
                                        <Image
                                            width={200}
                                            height={300}
                                            priority={true}
                                            className={styles['picture_bg']}
                                            alt={extractAttribute("name", location)}
                                            src={mediaImgSrc(`${extractAttribute("photo.data.attributes.url", location)}`)}
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
