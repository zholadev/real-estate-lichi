'use client'

import React, {useEffect, useState} from 'react';
import MapMarkers from "./MapMarkers";
import {MapContainer} from 'react-leaflet'
import MapTileContainer from "./MapTileContainer";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapObjectsContainer(props) {
    const {data, center, position, bounds, cluster, zoom = 13, style, isPopup, i18n, type, url, isBtn} = props

    const [mapConfig, setMapConfig] = useState([])

    useEffect(() => {
        if (!position) return
        if (mapConfig && position) {
            try {
                mapConfig.target.flyTo(position, 15, {
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
    );
}

export default React.memo(MapObjectsContainer);
