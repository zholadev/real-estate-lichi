'use client'

import React, {useEffect} from 'react';
import {useMap} from "react-leaflet";
import L from "leaflet";
import {ICON} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 01.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapControllerPrimary(props) {
    const {position, zoom, mapInfo} = props

    const map = useMap();

    map._layersMaxZoom = 15;

    const iconPerson = new L.Icon({
        iconUrl: ICON.mapMarketIcon['src'],
        iconAnchor: [20, 40],
        popupAnchor: [0, -20], // Adjust the popup anchor as needed
        iconSize: [119, 39],
    });

    let markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        animate: true,
        iconCreateFunction: function (cluster) {
            return L.divIcon({
                className: 'customIcon-cs',
                iconSize: [119, 38],
                html: '<div><span>' + cluster.getChildCount() + '</span></div>',
            })
        },
    });

    map.addLayer(markers);

    useEffect(() => {
        try {
            mapInfo?.map((data) => {
                const marker = L.marker(data, { icon: iconPerson, data: data });
                markers.addLayer(marker);
            });

            map.fitBounds(markers.getBounds());
        } catch (error) {
            console.log(`page: shopMaps, event: mapInitPositions, error: ${error}`);
        }
    }, [mapInfo]);

    const flyToHandler = (position) => {
        try {
            map.setView(position, zoom || 15);
        } catch (error) {
            console.log(`page: shopMaps, event: flyToHandler, error: ${error}`);
        }
    };

    L.tileLayer('https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2'],
        attribution: '2Гис',
        reuseTiles: false,
        updateWhenIdle: true,
        detectRetina: true,
    }).addTo(map);

    useEffect(() => {
        if (position) {
            flyToHandler(position);
        }
    }, [position]);

    return <></>;
}

export default MapControllerPrimary;
