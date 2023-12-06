import React from 'react';
import {getDictionary} from "@/dictionaries";
import {ResidencePageContainer} from "@/components/residence";
import {cookies} from "next/headers";
import {apiGetResidentialByIdData} from "@/shared/services/clientRequests";

async function fetchResidenceDataById(id) {
    return apiGetResidentialByIdData(id)
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

export const revalidate = 3600
