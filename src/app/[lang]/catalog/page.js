import React from 'react';
import {cookies} from "next/headers";
import {getDictionary} from "@/dictionaries";
import {Breadcrumbs} from "@/entities/breadcrumbs";
import {CatalogContainer} from "@/components/catalog";
import {cookiesName} from "@/shared/constants/options";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";

async function getCatalogResidenceData(page, params) {
    return apiGetResidentialData(page, params)
}

async function getGetApartmentsData(page, params) {
    return apiGetApartmentsData(page, params)
}

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Promise<Element>}
 * @constructor
 */
export default async function Page(props) {
    const queryParamsSet = (data) => {
        try {
            const newObject = {}

            // Проходимся по всем ключам оригинального объекта
            Object.keys(data).forEach((key) => {
                // Создаем новый ключ, добавляя 'apartments'
                const newKey = key.replace('filters[', 'filters[apartments][');
                // Устанавливаем новый ключ с оригинальным значением в новый объект
                newObject[newKey] = data[key];
            })

            return newObject
        } catch (error) {
            errorHandler("catalog/page", "queryParamsSet", error)
        }
    }

    const residenceListData = await getCatalogResidenceData(
        props?.searchParams?.["page"] || 1,
        {
            "fields[0]": "name",
            "sort[0]": "createdAt:desc",
            ...queryParamsSet(props?.searchParams)
        }
    )

    const apartmentListData = await getGetApartmentsData(
        props?.searchParams?.["page"] || 1,
        {
            "fields[0]": "name",
            "fields[1]": "price",
            "fields[2]": "an_initial_fee",
            "sort[0]": "createdAt:desc",
            ...props?.searchParams
        }
    )

    const cookieStore = cookies()
    const lang = cookieStore.get(cookiesName.lang)?.value || 'en'

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

