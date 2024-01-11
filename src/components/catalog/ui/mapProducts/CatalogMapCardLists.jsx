import React from 'react';
import {extractAttribute} from "@/shared/utilites";
import {Animation} from "@/shared/uikit/animation";
import {MapCard} from "@/shared/uikit/cards/mapCard";
import styles from "@/styles/catalog-products.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 11.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogMapCardLists(props) {
    const {currentListCardData, getPositionHandle, redirectTo, i18n} = props

    return (
        <div className={styles['map_address_box']}>
            {
                Object.values(currentListCardData || {}).map((position, id) => {
                    return (
                        <Animation
                            key={id}
                            isIntersection
                            id={id}
                            delay={0.123}
                            animateType={'fade_up'}
                        >
                            <MapCard
                                i18n={i18n}
                                redirect={redirectTo}
                                totalData={position?.["attributes"]}
                                data={extractAttribute("locate", position)}
                                page={extractAttribute("id", position, true)}
                                onGetCoordinates={() => {
                                    getPositionHandle([extractAttribute("locate.coordinates.coordinates.lat", position), extractAttribute("locate.coordinates.coordinates.lng", position)])
                                }}
                            />
                        </Animation>
                    )
                })
            }
        </div>
    );
}

export default CatalogMapCardLists;
