'use client'

import React, {useEffect, useMemo, useRef, useState} from 'react';
import MapMarkers from "./MapMarkers";
import {MapContainer, useMap, useMapEvents} from "react-leaflet";
import MapTileContainer from "./MapTileContainer";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapListContainer(props) {
    const {data, cluster, zoom = 13, style, isPopup, i18n, type, url, isBtn, position, getViewMarkers} = props

    const getBoundsSet = useMemo(() => {
        return Object.values(data || {}).map((marker) => [marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]])
    }, [data])

    const [mapConfig, setMapConfig] = useState([])

    const updateMarkers = () => {
        if (mapConfig) {
            try {
                const bounds = mapConfig.target.getBounds()

                const view = Object.values(data || {}).filter((marker) => bounds.contains([marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]]))

                if (getViewMarkers) {
                    if (Object.values(view || {}).length === 0) {
                        getViewMarkers(data)
                    } else {
                        getViewMarkers(view)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if (mapConfig.target) {
            mapConfig.target.on('moveend', updateMarkers)
        }

        return () => {
            if (mapConfig.target) {
                mapConfig.target.off('moveend', updateMarkers);
            }
        };
    }, [mapConfig, data]);

    useEffect(() => {
        if (!position) return
        if (mapConfig && position) {
            try {
                mapConfig.target.flyTo(position, 23, {
                    animate: false
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [mapConfig, position]);

    if (Object.values(data || {}).length === 0) {
        return null
    }

    return (
        <MapContainer
            zoom={zoom}
            bounds={getBoundsSet}
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
            />
        </MapContainer>
    );
}

export default React.memo(MapListContainer);
