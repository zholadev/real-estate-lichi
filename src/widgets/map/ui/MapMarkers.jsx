import React from 'react';
import MarkerBox from "./MarkerBox";
import MarkerClusterGroup from "react-leaflet-cluster";

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MapMarkers(props) {
    const {data, isPopup, cluster, i18n, type, url, isBtn, position} = props

    return (
        cluster ?
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
            >
                <MarkerBox
                    url={url}
                    i18n={i18n}
                    type={type}
                    data={data}
                    isBtn={isBtn}
                    isPopup={isPopup}
                    position={position}
                />
            </MarkerClusterGroup>
            :
            <MarkerBox
                url={url}
                i18n={i18n}
                type={type}
                data={data}
                isBtn={isBtn}
                isPopup={isPopup}
                position={position}
            />
    );
}

export default React.memo(MapMarkers);
