import React, {useEffect, useState} from 'react';
import {TagListSecondary} from "@/shared/uikit/tags";
import {useApiRequest} from "@/shared/hooks";
import {apiGetFilterResidenceList} from "@/shared/services/clientRequests";

const cityList = [
    {
        id: 1,
        title: "Burg Binghatti",
        link: "/catalog/residential"
    }, {
        id: 2,
        title: "Keturah Reserve",
        link: "/catalog/residential"
    }, {
        id: 3,
        title: "Bugatti Residences",
        link: "/catalog/residential"
    }, {
        id: 4,
        title: "Como Residences by Nakheel",
        link: "/catalog/residential"
    }, {
        id: 5,
        title: "The Sanctuary",
        link: "/catalog/residential"
    }, {
        id: 6,
        title: "Sobha Estates Villas",
        link: "/catalog/residential"
    },
]
const cityList2 = [
    {
        id: 7,
        title: "Vela Residences by Omniyat",
        link: "/catalog/residential"
    }, {
        id: 8,
        title: "Ocean House by Ellington",
        link: "/catalog/residential"
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

    const {apiFetchHandler, loading} = useApiRequest()

    const [residenceData, setResidenceData] = useState([])

    const getFilterResidenceData = async () => {
        await apiFetchHandler(apiGetFilterResidenceList, [], false, {
            onGetData: (params) => {
                setResidenceData(params.api_data)
            }
        })
    }

    useEffect(() => {
        getFilterResidenceData().catch(e => console.log(e))
    }, []);

    return (
        <>
            <TagListSecondary listTags={residenceData}/>
        </>
    );
}

export default MainBottomList;
