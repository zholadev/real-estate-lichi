'use client'

import React, {useMemo} from 'react';
import styles from '@/styles/catalog-products.module.sass'
import dynamic from "next/dynamic";
import {MapCard} from "@/shared/uikit/cards/mapCard";
import {useMediaMaxState} from "@/shared/hooks";
import {Swiper, SwiperSlide} from "swiper/react";

const MapController = dynamic(() => import('@/widgets/map/ui/MapController'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @creted 26.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapProducts(props) {

    const mediaMdQuery = useMediaMaxState({screenSize: 1024})
    const mediaSmQuery = useMediaMaxState({screenSize: 576})

    const data = useMemo(() => {
        return [
            {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            },
        ]
    }, [])

    return (
        <div className={styles['catalog_map_container']}>
            <MapController width={'100%'} height={mediaMdQuery ? 763 : 601}/>

            {/*{*/}
            {/*    mediaSmQuery ?*/}
            {/*        <div className={styles['map_address_box']}>*/}
            {/*            <Swiper*/}
            {/*                speed={200}*/}
            {/*                loop={false}*/}
            {/*                slidesPerView={3.3}*/}
            {/*                slidesPerGroup={4}*/}
            {/*                spaceBetween={8}*/}

            {/*            >*/}
            {/*                {*/}
            {/*                    data.map((item, id) => {*/}
            {/*                        return (*/}
            {/*                            <SwiperSlide key={id}>*/}
            {/*                                <MapCard/>*/}
            {/*                            </SwiperSlide>*/}
            {/*                        )*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </Swiper>*/}
            {/*        </div>*/}
            {/*        :*/}
            <div className={styles['map_address_box']}>
                <MapCard/>
                <MapCard/>
                <MapCard/>
                <MapCard/>
                <MapCard/>
                <MapCard/>
                <MapCard/>
            </div>
            {/*}*/}
        </div>
    );
}

export default CatalogMapProducts;
