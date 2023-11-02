'use client'

import React, {useEffect} from 'react';
import Script from "next/script";
import Head from "next/head";
import {mapCoordinates} from "@/shared/utils/mapCoordinates";

/**
 * @author Zholaman Zhumanov
 * @created 02.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function WebJlMap(props) {
    const {width = '100%', height = '100%'} = props

    useEffect(() => {
        try {
            if ('mapboxgl' in window) {
                mapboxgl.accessToken = 'pk.eyJ1IjoiemhvbGFkZXYiLCJhIjoiY2xvZ29jcmViMHdlOTJpazExN3R3czh6MSJ9.XEI2wiDgzvFj958_F31AEA';
                const map = new mapboxgl.Map({
                    container: 'map', // container ID
                    style: 'mapbox://styles/mapbox/streets-v12', // style URL
                    center: mapCoordinates[0], // starting position [lng, lat]
                    zoom: 9, // starting zoom,
                    pitch: 40,
                    bearing: 20,
                    antialias: true
                });

                map.on('load', () => {
                    map.addSource('floorplan', {
                        'type': 'geojson',
                        /*
                        * Each feature in this GeoJSON file contains values for
                        * `properties.height`, `properties.base_height`,
                        * and `properties.color`.
                        * In `addLayer` you will use expressions to set the new
                        * layer's paint properties based on these values.
                        */
                        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
                    });
                    map.addLayer({
                        'id': 'room-extrusion',
                        'type': 'fill-extrusion',
                        'source': 'floorplan',
                        'paint': {
// Get the `fill-extrusion-color` from the source `color` property.
                            'fill-extrusion-color': ['get', 'color'],

// Get `fill-extrusion-height` from the source `height` property.
                            'fill-extrusion-height': ['get', 'height'],

// Get `fill-extrusion-base` from the source `base_height` property.
                            'fill-extrusion-base': ['get', 'base_height'],

// Make extrusions slightly opaque to see through indoor walls.
                            'fill-extrusion-opacity': 0.5
                        }
                    });
                });
            }
        } catch (error) {
            console.log(`page: webJlMap, event: useEffect, error: ${error}`)
        }
    }, []);

    return (
        <div>
            <Head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet'/>
            </Head>

            <div id='map' style={{width: width, height: height}}></div>

            <Script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'/>
        </div>
    );
}

export default React.memo(WebJlMap);
