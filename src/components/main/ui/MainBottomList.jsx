import React from 'react';
import {TagListSecondary} from "@/shared/uikit/tags";

const cityList = [
    {
        id: 1,
        title: "Burg Binghatti"
    }, {
        id: 2,
        title: "Keturah Reserve"
    }, {
        id: 3,
        title: "Bugatti Residences"
    }, {
        id: 4,
        title: "Como Residences by Nakheel"
    }, {
        id: 5,
        title: "The Sanctuary"
    }, {
        id: 6,
        title: "Sobha Estates Villas"
    },
]
const cityList2 = [
    {
        id: 7,
        title: "Vela Residences by Omniyat"
    }, {
        id: 8,
        title: "Ocean House by Ellington"
    }
]

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @last-updated 15.10.2023 - Zholaman Zhumanov
 * @update-description TagListSecondary component is added
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainBottomList(props) {
    const {i18n} = props

    return (
        <>
            <TagListSecondary listTags={cityList}/>
            <TagListSecondary listTags={cityList2}/>
        </>
    );
}

export default MainBottomList;
