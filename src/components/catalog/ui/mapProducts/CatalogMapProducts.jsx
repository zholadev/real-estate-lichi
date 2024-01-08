'use client'

import React, {useEffect, useState} from 'react';
import styles from '@/styles/catalog-products.module.sass'
import dynamic from "next/dynamic";
import {MapCard} from "@/shared/uikit/cards/mapCard";
import {useMediaMaxState} from "@/shared/hooks";
import {Spinner} from "@/shared/uikit/template/spinner";
import Skeleton from "react-loading-skeleton";

const MapListContainer = dynamic(() => import('@/widgets/map/ui/MapListContainer'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @creted 26.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapProducts(props) {
    const {mapData, i18n, redirectTo, loading} = props

    const [position, setPosition] = useState(false)
    const [currentListCard, setCurrentListCard] = useState(mapData)

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    useEffect(() => {
        setCurrentListCard(mapData)

        return () => {
            setCurrentListCard([])
        }
    }, [mapData]);

    if (loading) {
        return (
            <div className={styles['loading_container']}>
                <Skeleton containerClassName={styles['skeleton_flex']} style={{height: "500px", width: mediaQuerySm ? "100%" : "calc(100% - 20px)"}}/>
                <div className={styles['loading_cards']}>
                    <Skeleton containerClassName={styles['skeleton_flex']} style={{height: "80px", width: "170px", marginBottom: "20px", marginInlineEnd: mediaQuerySm ? "20px" : 0}} count={5}/>
                </div>
            </div>
        )
    }

    if (Object.values(mapData || {}).length === 0) {
        return <h4>{i18n?.["site.not_found.title"]}</h4>
    }

    return (
        <div className={styles['catalog_map_container']}>
            <MapListContainer
                isBtn
                isPopup
                cluster
                zoom={50}
                i18n={i18n}
                type={"list"}
                data={mapData}
                position={position}
                url={`/catalog/${redirectTo}`}
                getViewMarkers={setCurrentListCard}
            />
            <div className={styles['map_address_box']}>
                {
                    Object.values(currentListCard || {}).map((position, id) => {
                        return (
                            <MapCard
                                key={id}
                                i18n={i18n}
                                redirect={redirectTo}
                                onGetCoordinates={() => {
                                    setPosition([position?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], position?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]])
                                }}
                                page={position?.["id"]}
                                totalData={position?.["attributes"]}
                                data={position?.["attributes"]?.["locate"]}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(CatalogMapProducts);
