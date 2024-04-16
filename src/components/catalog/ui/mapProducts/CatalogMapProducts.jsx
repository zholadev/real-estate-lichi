import React from 'react';
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import {useMediaMaxState} from "@/shared/hooks";
import styles from '@/styles/catalog-products.module.sass'

const MapListContainer = dynamic(() => import('@/widgets/map/ui/MapListContainer'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @creted 26.10.2023
 * @last-updated 11.01.2024 - Zholaman Zhumanov
 * @update-description refactoring and redesign
 * @update
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapProducts(props) {
    const {mapData, i18n, redirectTo, loading} = props

    const isSmallScreen = useMediaMaxState({screenSize: 768});

    if (loading) {
        return (
            <div className={styles['loading_container']}>
                <Skeleton
                    containerClassName={styles['skeleton_flex']}
                    style={{height: "800px", width: isSmallScreen ? "100%" : "calc(100% - 20px)"}}
                />

            </div>
        )
    }

    if (Object.values(mapData || {}).length === 0 && !loading) {
        return <h4 className={"text-center"}>{i18n?.["site.not_found.title"]}</h4>
    }

    return (
        <div className={styles['catalog_map_container']}>
            <MapListContainer
                isBtn
                isPopup
                cluster
                zoom={50}
                i18n={i18n}
                type={"list"}
                data={mapData}
                url={`/catalog/${redirectTo}`}
            />
        </div>
    );
}

export default React.memo(CatalogMapProducts);
