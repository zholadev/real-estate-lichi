'use client'

import React, {useCallback, useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import styles from "@/styles/object-page.module.sass";

// TODO: style file update

const MapObjectsContainer = dynamic(() => import('@/widgets/map/ui/MapObjectsContainer'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function PageMapInfo(props) {
    const {
        i18n,
        zoom,
        url,
        isBtn,
        isPopup,
        cluster,
        currentData,
        attractionsData,
        type = 'apartments',
        styleMap = {height: 500, width: "100%"},
    } = props

    const [mapData, setMapData] = useState([])
    const [position, setPosition] = useState(false)

    useEffect(() => {
        if (!currentData || !attractionsData) return
        const currentDataType = {type: "current", attributes: {...currentData}};
        const attractionDataType = attractionsData.map(item => ({type: "attraction", ...item}));

        setMapData([currentDataType, ...attractionDataType])
    }, [currentData, attractionsData]);

    const getPositionHandle = useCallback((pos) => {
        setPosition(pos)
    }, [])

    if (Object.values(attractionsData || {}).length === 0 || !attractionsData) {
        return null
    }

    return (
        <div className={styles['object_map_place']}>
            <h2>{i18n?.["site"]?.["in_map_title"]}</h2>

            <div className={styles['map_board_interaction']}>
                <div
                    className={styles['map_action']}
                    onClick={() => {
                        getPositionHandle([currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]])
                    }}
                >
                    <div className={styles['current_locate']}>Home</div>
                </div>
                <div className={styles['map_info']}>
                    <MapObjectsContainer
                        url={url}
                        zoom={zoom}
                        i18n={i18n}
                        type={'attractions'}
                        isBtn={isBtn}
                        data={mapData}
                        style={styleMap}
                        cluster={cluster}
                        isPopup={isPopup}
                        position={position}
                        center={[currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]]}
                    />

                    <ul className={styles['map_info_list']}>
                        {
                            Object.values(attractionsData || {}).map((localText) => {
                                return (
                                    <li key={localText?.["id"]}
                                        className={styles['list_item']}
                                        onClick={() => {
                                            getPositionHandle([localText?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], localText?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]])
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
