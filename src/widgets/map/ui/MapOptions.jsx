'use client'

import React, {useEffect} from 'react';
import {useMap} from "react-leaflet";
import L from 'leaflet'
import 'leaflet.markercluster'
import {mapCoordinates} from "@/shared/utils/mapCoordinates"
import {ICON} from "@/shared/constants/constants";

// TODO: refactoring

function MapOptions(props) {
    const {position, zoom, mapInfo} = props

    const map = useMap()

    map._layersMaxZoom = 15

    const iconPerson = new L.Icon({
        iconUrl: ICON.mapMarketIcon['src'],
        iconAnchor: [20, 40],
        popupAnchor: [0, 0],
        iconSize: [48, 48],
    })

    let markers = L?.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        animate: true,
        iconCreateFunction: function (cluster) {
            return L?.divIcon({
                className: 'customIcon',
                iconSize: [40, 40],
                html: '<div><span>' + cluster.getChildCount() + '</span></div>',
            })
        },
    })

    map?.addLayer(markers)

    useEffect(() => {
        try {
            mapInfo?.map((data) => {
                markers?.addLayer(
                    L.marker([data?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], data?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]], {
                        icon: iconPerson
                    })
                )
            })

            map.fitBounds(markers.getBounds())
        } catch (error) {
            console.log(`page: shopMaps, event: mapInitPositions, error: ${error}`)
        }
    }, [mapCoordinates])

    markers.clearLayers()

    L?.tileLayer('https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2'],
        attribution: '2Гис',
        reuseTiles: false,
        updateWhenIdle: true,
        detectRetina: true,
    }).addTo(map)

    return <></>
}

export default MapOptions;
