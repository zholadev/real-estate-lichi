import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {PageMapInfo} from "@/shared/uikit/map";
import {apiGetApartmentsByIdData} from "@/shared/services/clientRequests";
import {ApartmentPaymentPlan, ObjectDetailDescription, ObjectDetailPreview, ObjectLayout} from "@/components/object";

async function getGetApartmentsByIdData(id) {
    return apiGetApartmentsByIdData(id)
}

/**
 * @author Zholaman Zhumanov
 * @created 12.10.2023
 * @param props
 * @returns {Promise<Element>}
 * @constructor
 */
export default async function Page({params}) {
    const apartmentData = await getGetApartmentsByIdData(params.id)

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={'container_lg page_top_size'}>
            <Breadcrumbs
                i18n={i18n} page={'apartment'}
                pageName={apartmentData?.["data"]?.["data"]?.["attributes"]?.["name"]}
            />
            <ObjectDetailPreview
                i18n={i18n}
                apartmentData={apartmentData}
            />

            <ObjectDetailDescription apartmentData={apartmentData} i18n={i18n}/>
            <ApartmentPaymentPlan i18n={i18n} data={apartmentData?.["data"]?.["data"]?.["attributes"]?.["payment_plan"]}/>
            <ObjectLayout apartmentData={apartmentData?.["data"]?.["data"]} i18n={i18n}/>
            <PageMapInfo
                i18n={i18n}
                mapInfo={apartmentData?.["data"]?.["data"]?.["attributes"]?.["locations"]}
                mapInfoList={apartmentData?.["data"]?.["data"]?.["attributes"]?.["location_items"]}
            />
        </div>
    );
}
