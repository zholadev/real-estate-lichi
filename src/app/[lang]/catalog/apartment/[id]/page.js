import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {ObjectPage} from "@/components/object";
import {apiGetApartmentsByIdData} from "@/shared/services/clientRequests";

async function getGetApartmentsByIdData(id, locale) {
    return apiGetApartmentsByIdData(id, locale)
}

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Promise<Element>}
 * @constructor
 */
export default async function Page({params}) {
    const cookieStore = cookies()
    const apartmentData = await getGetApartmentsByIdData(params.id, cookieStore.get('dubai_lang')?.value)

    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <ObjectPage
            i18n={i18n}
            apartmentData={apartmentData?.["data"]?.["data"]}
        />
    )
}

export const revalidate = 3600
