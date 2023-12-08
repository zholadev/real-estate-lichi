'use client'

import React from 'react';
import {TileLayer} from "react-leaflet";

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
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapTileContainer(props) {
    return (
        <TileLayer url={tileLayerUrl} {...tileLayerOptions} />
    );
}

export default MapTileContainer;
