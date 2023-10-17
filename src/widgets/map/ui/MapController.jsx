'use client'

import React from 'react';
import styles from '@/styles/widget-map.module.sass'

import {MapContainer, ZoomControl} from 'react-leaflet'
import MapOptions from "./MapOptions";

// TODO: Refactoring

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapController(props) {
    const {width, height = 700} = props

    return (
        <div className={styles['map_controller']}>
            <MapContainer
                zoomControl={false}
                scrollWheelZoom={false}
                zoom={17}
                style={{width: "100%", height: height}}
            >
                <MapOptions/>
                <ZoomControl position="topright"/>
            </MapContainer>
        </div>
    );
}

export default React.memo(MapController);
