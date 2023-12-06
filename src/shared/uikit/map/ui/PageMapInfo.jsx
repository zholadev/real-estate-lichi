'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/styles/object-page.module.sass";
import dynamic from "next/dynamic";

// TODO: style file update

const MapContainer = dynamic(() => import('@/widgets/map/ui/MapController'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PageMapInfo(props) {
    const {i18n, mapInfo, mapInfoList, zoom, currentData, attractionsData} = props

    const [mapData, setMapData] = useState([])
    const [currentPositionCoord, setCurrentPositionCoord] = useState([currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]])

    useEffect(() => {
        const currentDataType = {type: "current", ...currentData};
        const attractionDataType = attractionsData.map(item => ({type: "attraction", ...item}));

        setMapData([currentDataType, ...attractionDataType])
    }, [currentData, attractionsData]);

    if (Object.values(attractionsData || {}).length === 0 || !attractionsData) {
        return null
    }

    return (
        <div className={styles['object_map_place']}>
            <h2>{i18n?.["site"]?.["in_map_title"]}</h2>

            <div className={styles['map_board_interaction']}>
                <div className={styles['map_action']} onClick={() => {
                    setCurrentPositionCoord([currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]])
                }}>
                    <div className={styles['current_locate']}>
                        Home
                    </div>
                </div>
                <div className={styles['map_info']}>
                    <MapContainer
                        center={[currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]]}
                        height={500}
                        mapInfo={mapInfo}
                        mapData={mapData}
                        zoom={zoom}
                        currentPositionCd={currentPositionCoord}
                    />

                    <ul className={styles['map_info_list']}>
                        {
                            Object.values(mapInfoList || {}).map((localText) => {
                                return (
                                    <li key={localText?.["id"]}
                                        className={styles['list_item']}
                                        onClick={() => {
                                            setCurrentPositionCoord([localText?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], localText?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]])
                                        }}
                                    >
                                        <div className={styles['dot_shape']}/>
                                        <span>{localText?.["attributes"]?.["name"]}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PageMapInfo;
