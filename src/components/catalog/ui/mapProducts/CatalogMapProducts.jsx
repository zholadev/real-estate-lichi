'use client'

import React from 'react';
import styles from '@/styles/catalog-products.module.sass'
import dynamic from "next/dynamic";
import {MapCard} from "@/shared/uikit/cards/mapCard";
import {useMediaMaxState} from "@/shared/hooks";

const MapController = dynamic(() => import('@/widgets/map/ui/MapComponent'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @creted 26.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapProducts(props) {
    const {mapData, i18n, redirectTo} = props

    const mediaMdQuery = useMediaMaxState({screenSize: 1024})

    return (
        <div className={styles['catalog_map_container']}>
            <MapController
                mapData={mapData}
                width={'100%'}
                type={'secondary'}
                height={mediaMdQuery ? 763 : 601}
            />
            <div className={styles['map_address_box']}>
                {
                    Object.values(mapData || {}).map((position, id) => {
                        return (
                            <MapCard
                                key={id}
                                i18n={i18n}
                                data={position?.["attributes"]?.["locate"]}
                                page={position?.["id"]}
                                totalData={position?.["attributes"]}
                                redirect={redirectTo}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(CatalogMapProducts);
