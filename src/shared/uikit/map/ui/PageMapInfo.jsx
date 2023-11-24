'use client'

import React, {useEffect, useState} from 'react';
import styles from "@/styles/object-page.module.sass";
import {IMG} from "@/shared/constants/constants";
import dynamic from "next/dynamic";
import {MotionTextUnderLine} from "@/shared/uikit/motion";

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
    const {i18n, mapInfo, mapInfoList} = props

    const [currentMap, setCurrentMap] = useState('sport')

    const switchCurrentMapValue = (value) => {
        setCurrentMap(value)
    }

    useEffect(() => {
        return () => {
            setCurrentMap('sport')
        }
    }, []);

    return (
        <div className={styles['object_map_place']}>
            <h2>{i18n?.["site"]?.["in_map_title"]}</h2>

            <div className={styles['map_board_interaction']}>
                <div className={styles['map_action']}>
                    {/*<ul className={styles['map_tab_list']}>*/}
                    {/*    <li className={`${styles['list_item']} ${currentMap === 'sport' ? styles['active'] : ''}`}*/}
                    {/*        onClick={() => switchCurrentMapValue('sport')}>*/}
                    {/*        <span>*/}
                    {/*            Спорт*/}
                    {/*        </span>*/}
                    {/*    </li>*/}
                    {/*    <li className={`${styles['list_item']} ${currentMap === 'sport1' ? styles['active'] : ''}`}*/}
                    {/*        onClick={() => switchCurrentMapValue('sport1')}>*/}
                    {/*        <span>*/}
                    {/*            достопримечательности*/}
                    {/*        </span>*/}
                    {/*    </li>*/}
                    {/*    <li className={`${styles['list_item']} ${currentMap === 'sport2' ? styles['active'] : ''}`}*/}
                    {/*        onClick={() => switchCurrentMapValue('sport2')}>*/}
                    {/*        <span>*/}
                    {/*            магазины*/}
                    {/*        </span>*/}
                    {/*    </li>*/}
                    {/*    <li className={`${styles['list_item']} ${currentMap === 'sport3' ? styles['active'] : ''}`}*/}
                    {/*        onClick={() => switchCurrentMapValue('sport3')}>*/}
                    {/*        <span>*/}
                    {/*            аптеки*/}
                    {/*        </span>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>

                <div className={styles['map_info']}>
                    <MapContainer height={484} mapInfo={mapInfo}/>

                    <ul className={styles['map_info_list']}>
                        {
                            Object.values(mapInfoList || {}).map((localText) => {
                                return (
                                    <li key={localText?.["id"]} className={styles['list_item']}>
                                        <div className={styles['dot_shape']}/>
                                        <span>{localText?.["locate"]}</span>
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
