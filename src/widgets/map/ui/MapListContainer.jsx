'use client'

import React, {useMemo} from 'react';
import MapMarkers from "./MapMarkers";
import {MapContainer} from "react-leaflet";
import MapTileContainer from "./MapTileContainer";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapListContainer(props) {
    const {data, cluster, zoom = 13, style, isPopup, i18n, type, url, isBtn} = props

    const getBoundsSet = useMemo(() => {
        return Object.values(data || {}).map((marker) => [marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]])
    },[data])

    if (Object.values(data || {}).length === 0) {
        return null
    }

    return (
        <MapContainer
            zoom={zoom}
            bounds={getBoundsSet}
            style={style}
            whenReady={(map) => {
                console.log('map configs', map)
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

export default MapListContainer;
