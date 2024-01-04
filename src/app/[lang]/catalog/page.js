import React from 'react';
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import {CatalogContainer} from "@/components/catalog";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";
import {cookies} from "next/headers";

async function getCatalogResidenceData(page, params) {
    return apiGetResidentialData(page, params)
}

async function getGetApartmentsDataData(page, params) {
    return apiGetApartmentsData(page, params)
}

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Promise<Element>}
 * @constructor
 */
export default async function Page(props) {
    const residenceListData = await getCatalogResidenceData(
        props?.searchParams?.["page"] || 1,
        {
            "fields[0]": "name",
            ...props?.searchParams
        }
    )
    const apartmentListData = await getGetApartmentsDataData(
        props?.searchParams?.["page"] || 1,
        {
            "fields[0]": "name",
            "fields[1]": "price",
            "fields[2]": "an_initial_fee",
            ...props?.searchParams
        }
    )

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={"page_top_size"}>
            <div className={'container_md mb-50'}>
                <Breadcrumbs i18n={i18n} page={'catalog'}/>
            </div>
            <CatalogContainer
                pageParams={props.searchParams}
                residenceListData={residenceListData?.["data"]?.["data"]}
                apartmentListData={apartmentListData?.["data"]?.["data"]}
                residenceMetaData={residenceListData?.["data"]?.["meta"]}
                apartmentMetaData={apartmentListData?.["data"]?.["meta"]}
                i18n={i18n}
            />
        </div>
    );
}

