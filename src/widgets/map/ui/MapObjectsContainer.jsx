'use client'

import React, {useEffect, useRef, useState} from 'react';
import MapMarkers from "./MapMarkers";
import {MapContainer} from 'react-leaflet'
import Skeleton from "react-loading-skeleton";
import MapTileContainer from "./MapTileContainer";
import {useMediaQuery} from "react-responsive";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapObjectsContainer(props) {
    const {data, center, position, bounds, cluster, zoom = 13, style, isPopup, i18n, type, url, isBtn, loading} = props

    const timerLoadingMapRef = useRef(null)

    const [mapConfig, setMapConfig] = useState([])
    const [loadingMap, setLoadingMap] = useState(false)

    const mediaQuerySm = useMediaQuery({maxWidth: 576.98})
    const mediaQueryMd = useMediaQuery({minWidth: 577, maxWidth: 1024})

    useEffect(() => {
        if (!position) return
        if (mapConfig.target && position) {
            try {
                mapConfig.target.flyTo(position, 18, {
                    animate: false
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [mapConfig, position]);

    useEffect(() => {
        if (!loading) return
        setLoadingMap(true)

        if (mapConfig.target) {
            timerLoadingMapRef.current = setTimeout(() => {
                setLoadingMap(false)
            }, 2000)
        }

        return () => {
            clearTimeout(timerLoadingMapRef.current)
        }
    }, [mapConfig, loading]);

    if (Object.values(data || {}).length === 0) {
        return null
    }

    return (
        <>
            {loadingMap && loading && <Skeleton style={{width: "100%", height: mediaQuerySm ? "calc(100vh - 200px)" : mediaQueryMd ? "calc(100vh - 100px)" : 800}}/>}
            <MapContainer
                center={center}
                zoom={zoom}
                bounds={bounds}
                style={style}
                whenReady={(map) => {
                    setMapConfig(map)
                }}
            >
                <MapTileContainer/>
                <MapMarkers
                    url={url}
                    i18n={i18n}
                    data={data}
                    type={type}
                    isBtn={isBtn}
                    cluster={cluster}
                    isPopup={isPopup}
                    position={position}
                />
            </MapContainer>
        </>
    );
}

export default React.memo(MapObjectsContainer);
