import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {ResidencePage} from "@/components/residence";
import {cookiesName} from "@/shared/constants/options";
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
    const lang = cookieStore.get(cookiesName.lang)?.value || 'en'

    const i18n = await getDictionary(lang)

    const data = await fetchResidenceDataById(params.id)

    return (
        <ResidencePage
            i18n={i18n}
            id={params.id}
            residenceData={data?.["data"]?.["data"]}
        />
    )
}

export const revalidate = 3600
