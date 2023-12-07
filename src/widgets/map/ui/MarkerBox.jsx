import React, {useEffect, useRef} from 'react';
import L from "leaflet";
import {Marker, Popup} from "react-leaflet";
import MapPopup from "@/widgets/map/ui/MapPopup";
import {ICON} from "@/shared/constants/constants";

const iconList = new L.Icon({
    iconUrl: ICON.mapMarketBlackScIcon['src'],
    iconAnchor: [20, 40],
    popupAnchor: [0, -20],
    iconSize: [40, 40],
});

const iconAttractionIcon = new L.Icon({
    iconUrl: ICON.mapMarketIcon['src'],
    iconAnchor: [20, 40],
    popupAnchor: [0, 0],
    iconSize: [48, 48],
})

const iconCurrentLocate = new L.Icon({
    iconUrl: ICON.mapMarketBlackIcon['src'],
    iconAnchor: [20, 40],
    popupAnchor: [0, 0],
    iconSize: [48, 48],
})

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function MarkerBox(props) {
    const {data, isPopup, isBtn, type, i18n, animate, url, position} = props

    const markerRef = useRef(null)

    const equalArrayCoordinates = (index) => {
        if (index.length !== position.length) {
            return false;
        }

        for (let i = 0; i < index.length; i++) {
            if (index[i] !== position[i]) {
                return false;
            }
        }

        return true
    }

    const openPopupDefaultHandle = () => {
        if (!position) return

        if (markerRef) {
            try {
                const searchLocates = data?.filter((marker) => {
                    const index = [marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]]

                    if (index.length !== position.length) {
                        return false;
                    }

                    for (let i = 0; i < index.length; i++) {
                        if (index[i] !== position[i]) {
                            return false;
                        }
                    }

                    return [marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]]
                })

                const currentMarker = [searchLocates?.[0]?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], searchLocates?.[0]?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]]

                const marker = markerRef.current

                console.log(equalArrayCoordinates(currentMarker))

                if (marker) {
                    if (equalArrayCoordinates(currentMarker)) {
                        marker.openPopup()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    // useEffect(() => {
    //     openPopupDefaultHandle()
    // }, [position]);

    return (
        Object.values(data || {}).map((marker, index) => {
            const attractionPosition = [marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["coordinates"]?.["coordinates"]?.["lng"]]
            const listPosition = [marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lat"], marker?.["attributes"]?.["locate"]?.["coordinates"]?.["coordinates"]?.["lng"]]
            return (
                <Marker
                    ref={markerRef}
                    key={index}
                    animate={animate}
                    position={type === 'attractions' ? attractionPosition : listPosition}
                    icon={type === 'list' ? iconList : marker?.["type"] === "current" ? iconCurrentLocate : iconAttractionIcon}
                >
                    {
                        isPopup &&
                        <Popup>
                            <MapPopup
                                url={url}
                                i18n={i18n}
                                isBtn={isBtn}
                                data={marker}
                                id={marker?.["id"] || false}
                                name={marker?.["attributes"]?.["locate"]?.["name"] || marker?.["attributes"]?.["name"]}
                                price={marker?.["attributes"]?.["locate"]?.["price"] || marker?.["attributes"]?.["price"]}
                                photo={marker?.["attributes"]?.["locate"]?.["photo"]?.["data"]?.[0]?.["attributes"]?.["url"] || marker?.["attributes"]?.["photo"]?.["data"]?.[0]?.["attributes"]?.["url"] || marker?.["attributes"]?.["photo"]?.["data"]?.["attributes"]?.["url"]}
                            />
                        </Popup>
                    }
                </Marker>
            )
        })
    );
}

export default MarkerBox;
