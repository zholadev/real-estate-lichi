'use client'

import React, {useRef} from 'react';
import {mapCoordinates} from "@/shared/utils/mapCoordinates";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import styles from '@/styles/widget-map.module.sass'
import {ICON, IMG} from "@/shared/constants/constants";
import L from "leaflet";


const tileLayerUrl = 'https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}';
const tileLayerOptions = {
    subdomains: ['0', '1', '2'],
    attribution: '2Гис',
    reuseTiles: false,
    updateWhenIdle: true,
    detectRetina: true,
};

/**
 * @author Zholaman Zhumanov
 * @created 01.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapComponent(props) {
    const {width, height} = props

    const mapRef = useRef(null);

    const iconPerson = new L.Icon({
        iconUrl: ICON.mapMarketIcon['src'],
        iconAnchor: [20, 40],
        popupAnchor: [0, -20], // Adjust the popup anchor as needed
        iconSize: [40, 40],
    });


    const PopupContent = () => {
        return (
            <div className={styles['map_popup']}>
                <div className={styles['info']}>
                    <h3 className={styles['popup_title']}>Burg Binghatti</h3>

                    <div className={styles['popup_price']}>от 68.065.000$</div>
                </div>
                <img src={IMG.templateMapPopup['src']} alt=""/>
                <div className={styles['popup_object_count']}>3 объекта</div>
            </div>
        )
    }

    return (
        <MapContainer
            zoom={13}
            style={{height: height, width: width}}
            ref={mapRef}
            bounds={mapCoordinates}
            // center={center}
        >
            <TileLayer url={tileLayerUrl} {...tileLayerOptions} />
            {mapCoordinates.map((marker, index) => {
                // console.log(marker)
                return (
                    <Marker animate={true} key={index} position={marker} icon={iconPerson}>
                        <Popup>
                            <PopupContent/>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
}

export default MapComponent;
