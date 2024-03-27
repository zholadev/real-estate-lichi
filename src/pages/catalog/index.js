import React from 'react';
import {Breadcrumbs} from "@/entities/breadcrumbs";
import {globalProps} from "@/entities/globalProps";
import {CatalogContainer} from "@/components/catalog";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";

function Catalog(props) {
    const {i18n, residenceListData, apartmentListData} = props

    return (
        <div className={"page_top_size"}>
            <div className={'container_md mb-50'}>
                <Breadcrumbs i18n={i18n} page={'catalog'}/>
            </div>
            <CatalogContainer
                i18n={i18n}
                residenceListData={residenceListData?.["data"]}
                apartmentListData={apartmentListData?.["data"]}
                residenceMetaData={residenceListData?.["meta"]}
                apartmentMetaData={apartmentListData?.["meta"]}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const {page} = context.query

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
                console.log("An error has occurred, event - queryParamsSet")
            }
        }

        const residenceListData = await apiGetResidentialData(
            page || 1,
            {
                "fields[0]": "name",
                "sort[0]": "createdAt:desc",
                ...queryParamsSet(context.query)
            }
        )

        const apartmentListData = await apiGetApartmentsData(
            page || 1,
            {
                "fields[0]": "name",
                "fields[1]": "price",
                "fields[2]": "an_initial_fee",
                "sort[0]": "createdAt:desc",
                ...context.query
            }
        )

        return {
            props: {
                residenceListData: residenceListData,
                apartmentListData: apartmentListData,
                ...await globalProps(context)
            }
        }
    } catch (error) {
        console.log("An error has occurred")
    }
}

export default Catalog;
