

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import dynamic from "next/dynamic";
import styles from "@/styles/object-page.module.sass";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

const MapObjectsContainer = dynamic(() => import('@/widgets/map/ui/MapObjectsContainer'), {ssr: false})
const AttractionsCardList = dynamic(() => import('./AttractionsCardList'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @last-updated 10.01.2024 - Zholaman Zhumanov
 * @update-description redesign
 * @param props
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function AttractionsLocation(props) {
    const {
        i18n,
        zoom,
        url,
        isBtn,
        isPopup,
        cluster,
        currentData,
        attractionsData,
        sliderCardCountView,
        styleMap = {height: 800, width: "100%"},
    } = props

    const [mapData, setMapData] = useState([])
    const [position, setPosition] = useState([currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]])

    const componentData = useMemo(() => {
        try {
            return {
                "attractionsData": attractionsData || [],
                "defaultCoordinatePhoto": currentData.photo || [],
                "defaultCoordinate": [currentData?.["coordinates"]?.["coordinates"]?.["lat"], currentData?.["coordinates"]?.["coordinates"]?.["lng"]] || [],
            }
        } catch (error) {
            errorHandler("attractionLocation", "componentData", error)
        }
    }, [currentData])

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
        <div className={styles['attractions_map_container']}>
            <h2>{i18n?.["site"]?.["in_map_title"]}</h2>

            <div className={styles['attractions_content']}>
                <div className={styles['map_info']}>
                    <div className={styles['map_box']}>
                        <MapObjectsContainer
                            url={url}
                            zoom={zoom}
                            i18n={i18n}
                            isBtn={isBtn}
                            data={mapData}
                            style={styleMap}
                            cluster={cluster}
                            isPopup={isPopup}
                            position={position}
                            type={'attractions'}
                            center={componentData.defaultCoordinate}
                        />
                    </div>

                    <div className={styles['map_cards_list']}>
                        <AttractionsCardList
                            i18n={i18n}
                            currentData={currentData}
                            componentData={componentData}
                            getPositionHandle={getPositionHandle}
                            sliderCardCountView={sliderCardCountView}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttractionsLocation;
