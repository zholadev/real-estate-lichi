import React from 'react';
import {getDictionary} from "@/dictionaries";
import {ResidencePageContainer} from "@/components/residence";
import {cookies} from "next/headers";
import {apiGetApartmentsData, apiGetResidentialByIdData} from "@/shared/services/clientRequests";

async function fetchResidenceDataById(id) {
    return apiGetResidentialByIdData(
        id,
        {
            "populate": "*,residence,room,prices,district,property_type,tags,apartments,apartments.photo_preview.big,apartments.photo_preview.small,locations.photos,interior_description,interior_description.images,photos,photo_preview,videos,video_posters,videos.big,videos.small,photos.big,photos.small,video_posters.big,video_posters.small,location_items",
        }
    )
}

/**
 * @author Zholaman Zhumanov
 * @created
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page({params}) {
    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    const data = await fetchResidenceDataById(params.id)

    return <ResidencePageContainer
        i18n={i18n}
        id={params.id}
        residenceData={data?.["data"]?.["data"]}
    />;
}
