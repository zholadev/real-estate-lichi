import React, {useEffect, useMemo} from 'react';
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import styles from '@/styles/catalog-products.module.sass'
import {useAppSelector} from "@/entities/store/hooks/hooks";
import {CatalogProducts, Filter} from "@/components/catalog";
import {useApiRequest, useDispatchHandler} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import CatalogMapProducts from "../mapProducts/CatalogMapProducts";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogContainer(props) {
    const {
        i18n = {},
        residenceListData = [],
        apartmentListData = [],
        apartmentMetaData = [],
        residenceMetaData = [],
    } = props

    const router = useRouter()

    const {query} = router

    const searchQuery = useSearchParams()

    const {apiFetchHandler, loading} = useApiRequest()

    const app = useDispatchHandler()

    const {
        catalogType,
        catalogContent,
        catalogObjectMapData,
        catalogResidenceMapData
    } = useAppSelector(state => state?.catalog)

    const isResidential = searchQuery.get('type') === 'residential_complex' || catalogContent === 'residential_complex';

    console.log("catalogContent", catalogContent)
    console.log("catalogType", catalogType)

    const tabData = useMemo(() => {
        try {
            return [
                {
                    id: 1,
                    value: "apartments",
                    title: i18n?.["site"]?.["objects"]
                },
                {
                    id: 2,
                    value: "residential_complex",
                    title: i18n?.["site"]?.["residential_complex"]
                },
            ]
        } catch (error) {
            console.log(`page: catalog, event: tabData, error: ${error}`)
        }
    }, [i18n])

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
            errorHandler("CatalogContainer", "queryParamsSet", error)
        }
    }

    const fetchResidenceData = async () => {
        if (catalogType !== 'map') return
        await apiFetchHandler(
            apiGetResidentialData,
            [
                query?.["page"],
                {
                    "pagination[limit]": -1,
                    "fields[0]": "name",
                    "sort[0]": "createdAt:desc",
                    ...queryParamsSet(query)
                }
            ],
            false,
            {
                onGetData: (params) => {
                    app.catalogResidenceMapDataAction(params.api_data)
                }
            }
        )
    }

    const fetchApartmentData = async () => {
        if (catalogType !== 'map') return
        await apiFetchHandler(
            apiGetApartmentsData,
            [
                query?.["page"],
                {
                    "pagination[limit]": -1,
                    "fields[0]": "name",
                    "fields[1]": "price",
                    "fields[2]": "an_initial_fee",
                    "sort[0]": "createdAt:desc",
                    ...query
                }
            ],
            false,
            {
                onGetData: (params) => {
                    app.catalogObjectMapDataAction(params.api_data)
                }
            }
        )
    }

    useEffect(() => {
        fetchResidenceData()
        fetchApartmentData()
    }, [query]);

    return (
        <div className={styles['catalog_products_list']}>
            <div className={'container_md mb-15'}>
                <Filter
                    i18n={i18n}
                    tabData={tabData}
                />
            </div>
            {catalogType === 'map' ? (
                <CatalogMapProducts
                    i18n={i18n}
                    loading={loading}
                    redirectTo={isResidential ? 'residence' : 'apartment'}
                    mapData={isResidential ? catalogResidenceMapData : catalogObjectMapData}
                />
            ) : (
                <div className={'container_md'}>
                    <CatalogProducts
                        i18n={i18n}
                        redirectTo={isResidential ? 'residence' : 'apartment'}
                        metaData={isResidential ? residenceMetaData : apartmentMetaData}
                        catalogData={isResidential ? residenceListData : apartmentListData}
                    />
                </div>
            )}
        </div>
    );
}

export default CatalogContainer;
