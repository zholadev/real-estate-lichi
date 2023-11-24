'use client'

import React, {useEffect} from 'react';
import * as maptilersdk from "@maptiler/sdk";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import {mapCoordinates} from "@/shared/utils/mapCoordinates";
import styles from "@/styles/widget-map.module.sass";
import {IMG} from "@/shared/constants/constants";

/**
 * @author Zholaman Zhumanov
 * @created 02.11.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapTiler(props) {
    const {width, height} = props

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

    useEffect(() => {
        try {
            maptilersdk.config.apiKey = '1DCLUwktaYHflbi117Se';
            const map = new maptilersdk.Map({
                container: 'map', // container's id or the HTML element to render the map
                style: maptilersdk.MapStyle.DATAVIZ.DARK,
                center: mapCoordinates[0], // starting position [lng, lat]
                zoom: 9, // starting zoom
            });

            mapCoordinates.forEach((coord) => {
                const customPopup = document.createElement('div');
                customPopup.innerHTML = `
                <div className={styles['map_popup']}>
                <div className={styles['info']}>
                    <h3 className={styles['popup_title']}>Burg Binghatti</h3>

                    <div className={styles['popup_price']}>от 68.065.000$</div>
                </div>
                <img src={IMG.templateMapPopup['src']} alt=""/>
                <div className={styles['popup_object_count']}>3 объекта</div>
            </div>`;

                const marker = new maptilersdk.Marker({
                    color: '#ffffff'
                })
                    .setPopup(new maptilersdk.Popup().setHTML(` <div class='map-popup'>
                <div class='info'>
                    <h3 class='popup_title'>Burg Binghatti</h3>

                    <div class='popup_price'>от 68.065.000$</div>
                </div>
                <img src="/images/template/templateMapPopup.png" alt=""/>
                <div class='popup_object_count'>3 объекта</div>
            </div>`))
                    // .setPopup(new maptilersdk.Popup().setContent(<PopupContent/>))
                    .setLngLat(coord)
                    .addTo(map);
            });
        } catch (error) {
            console.log(`page: mapTiler, event: useEffect, error: ${error}`)
        }
    }, []);

    return (
        <div>
            <div id={'map'} style={{width: width, height: height}}></div>
        </div>
    );
}

export default MapTiler;
