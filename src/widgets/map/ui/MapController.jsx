'use client'

import React from 'react';
import styles from '@/styles/widget-map.module.sass'

import {MapContainer, ZoomControl} from 'react-leaflet'
import MapOptions from "./MapOptions";
import MapControllerPrimary from "@/widgets/map/ui/MapControllerPrimary";

// TODO: Refactoring

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapController(props) {
    const {width = "100%", height = 700, type = 'primary'} = props

    return (
        <div className={styles['map_controller']} style={{width: width, height: height}}>
            <MapContainer
                zoomControl={false}
                scrollWheelZoom={false}
                zoom={17}
                style={{width: width, height: height}}
            >
                {type === 'secondary' ?  <MapControllerPrimary/> :  <MapOptions/>}
                <ZoomControl position="topright"/>
            </MapContainer>
        </div>
    );
}

export default React.memo(MapController);
