'use client'

import React, {useRef} from 'react';
import {mapCoordinates} from "@/shared/utils/mapCoordinates";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import styles from '@/styles/widget-map.module.sass'
import {ICON} from "@/shared/constants/constants";
import L from "leaflet";
import {mediaImgSrc} from "@/shared/constants/options";
import Image from "next/image";
import {useCurrencyFormat} from "@/shared/hooks";


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
    const {width, height, mapData = [], mapInfo} = props

    const convertCurrency = useCurrencyFormat()

    const mapRef = useRef(null);

    const iconPerson = new L.Icon({
        iconUrl: ICON.mapMarketIcon['src'],
        iconAnchor: [20, 40],
        popupAnchor: [0, -20],
        iconSize: [40, 40],
    });


    const PopupContent = (data) => {
        return (
            <div className={styles['map_popup']}>
                <div className={styles['info']}>
                    <h3 className={styles['popup_title']}>{data?.["data"]?.["name"]}</h3>

                    {data?.["data"]?.["price"] &&
                        <div className={styles['popup_price']}>{convertCurrency(data?.["data"]?.["price"])}</div>}
                </div>
                <Image
                    src={mediaImgSrc(`${data?.["data"]?.["locate"]?.["photo"]?.["data"]?.[0]?.["attributes"]?.["url"]}`)}
                    alt={data?.["data"]?.["name"]}
                    priority={true}
                    width={200}
                    height={200}
                />
            </div>
        )
    }

    if (Object.values(mapData || {}).length === 0) {
        return null
    }

    return (
        <MapContainer
            zoom={17}
            style={{height: height, width: width}}
            ref={mapRef}
            bounds={mapCoordinates}
        >
            <TileLayer url={tileLayerUrl} {...tileLayerOptions} />
            {Object.values(mapData || {}).map((marker, index) => {
                return (
                    <Marker
                        animate={true}
                        key={index}
                        position={[marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]]}
                        icon={iconPerson}
                    >
                        <Popup>
                            <PopupContent data={marker?.["attributes"]}/>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
}

export default React.memo(MapComponent);
