import React from 'react';
import styles from "@/styles/object-page.module.sass";
import {IMG} from "@/shared/constants/constants";
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
    const {i18n} = props

    return (
        <div className={styles['object_map_place']}>
            <h2>{i18n?.["site"]?.["in_map_title"]}</h2>

            <div className={styles['map_board_interaction']}>
                <div className={styles['map_action']}>
                    <ul className={styles['map_tab_list']}>
                        <li className={`${styles['list_item']} ${styles['active']}`}>Спорт</li>
                        <li className={`${styles['list_item']}`}>достопримечательности</li>
                        <li className={`${styles['list_item']}`}>магазины</li>
                        <li className={`${styles['list_item']}`}>аптеки</li>
                    </ul>
                </div>

                <div className={styles['map_info']}>
                    <MapContainer height={484} />
                    <ul className={styles['map_info_list']}>
                        <li className={styles['list_item']}>
                            <div className={styles['dot_shape']}/>
                            <span>5 минут до Бизнес Бэй</span>
                        </li>
                        <li className={styles['list_item']}>
                            <div className={styles['dot_shape']}/>
                            <span>10 минут до Бурдж Халифа</span>
                        </li>
                        <li className={styles['list_item']}>
                            <div className={styles['dot_shape']}/>
                            <span>13 минут до пляжа Джумейра</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PageMapInfo;
