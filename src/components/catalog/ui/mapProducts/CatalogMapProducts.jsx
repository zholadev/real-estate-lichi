'use client'

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import {useMediaMaxState} from "@/shared/hooks";
import CatalogMapCardLists from "./CatalogMapCardLists";
import styles from '@/styles/catalog-products.module.sass'

const MapListContainer = dynamic(() => import('@/widgets/map/ui/MapListContainer'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @creted 26.10.2023
 * @last-updated 11.01.2024 - Zholaman Zhumanov
 * @update-description refactoring and redesign
 * @update
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapProducts(props) {
    const {mapData, i18n, redirectTo, loading} = props

    const [position, setPosition] = useState(false);
    const [currentCardList, setCurrentCardList] = useState(mapData);

    const isSmallScreen = useMediaMaxState({screenSize: 768});

    useEffect(() => {
        setCurrentCardList(mapData)
        return () => setCurrentCardList([])
    }, [mapData]);

    if (loading) {
        return (
            <div className={styles['loading_container']}>
                <Skeleton
                    containerClassName={styles['skeleton_flex']}
                    style={{height: "800px", width: isSmallScreen ? "100%" : "calc(100% - 20px)"}}
                />
                <div className={styles['loading_cards']}>
                    <Skeleton containerClassName={styles['skeleton_flex']} style={{
                        height: "80px",
                        width: "170px",
                        marginBottom: "20px",
                        marginInlineEnd: isSmallScreen ? "20px" : 0
                    }} count={5}/>
                </div>
            </div>
        )
    }

    if (Object.values(mapData || {}).length === 0) {
        return <h4>{i18n?.["site.not_found.title"]}</h4>
    }

    return (
        <div className={styles['catalog_map_container']}>
            <CatalogMapCardLists
                i18n={i18n}
                redirectTo={redirectTo}
                getPositionHandle={setPosition}
                currentListCardData={currentCardList}
            />
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
                getViewMarkers={setCurrentCardList}
            />
        </div>
    );
}

export default React.memo(CatalogMapProducts);
