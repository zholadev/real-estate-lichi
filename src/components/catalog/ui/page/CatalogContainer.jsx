'use client'

import React, {useEffect, useMemo, useState} from 'react';
import {useApiRequest} from "@/shared/hooks";
import {StoreProvider} from "@/entities/store";
import {useSearchParams} from "next/navigation";
import styles from '@/styles/catalog-products.module.sass'
import {CatalogProducts, Filter} from "@/components/catalog";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import CatalogMapProducts from "@/components/catalog/ui/mapProducts/CatalogMapProducts";
import {apiGetApartmentsData, apiGetResidentialData} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogContainer(props) {
    const {i18n, residenceListData, apartmentListData, apartmentMetaData, residenceMetaData, pageParams} = props

    const query = useSearchParams()

    const {loading, apiFetchHandler} = useApiRequest()

    const [typeContent, setTypeContent] = useState('list')
    const [typeCatalog, setTypeCatalog] = useState('object')

    const [objectClientData, setObjectClientData] = useState([])
    const [residenceClientData, setResidenceClientData] = useState([])

    const isResidential = query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex';
    const isMapContent = typeContent === 'map'

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

    const toggleView = () => {
        if (typeContent !== 'map') {
            setTypeContent('map')
        } else {
            setTypeContent('list')
        }
    }

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
        try {
            await apiFetchHandler(
                apiGetResidentialData,
                [pageParams?.["page"], {"pagination[limit]": -1, ...queryParamsSet(pageParams)}],
                false,
                {
                    onGetData: (params) => {
                        setResidenceClientData(params.data?.["data"]?.["data"])
                    }
                }
            )
        } catch (error) {
            errorHandler("catalogContainer", "fetchResidenceData", error)
        }
    }

    const fetchApartmentData = async () => {
        try {
            await apiFetchHandler(
                apiGetApartmentsData,
                [pageParams?.["page"], {"pagination[limit]": -1, ...pageParams}],
                false,
                {
                    onGetData: (params) => {
                        setObjectClientData(params.data?.["data"]?.["data"])
                    }
                }
            )

        } catch (error) {
            errorHandler("catalogContainer", "fetchResidenceData", error)
        }
    }

    useEffect(() => {
        if (isMapContent) {
            fetchResidenceData()
            fetchApartmentData()
        }
    }, [isMapContent, pageParams]);

    return (
        <StoreProvider>
            <div className={styles['catalog_products_list']}>
                <div className={'container_md mb-15'}>
                    <Filter
                        i18n={i18n}
                        tabData={tabData}
                        onClick={toggleView}
                        pageParams={pageParams}
                        typeContent={typeContent}
                        typeCatalog={typeCatalog}
                        setTypeCatalog={setTypeCatalog}
                        apartmentListData={apartmentListData}
                    />
                </div>
                {typeContent === 'map' ? (
                    <CatalogMapProducts
                        i18n={i18n}
                        loading={loading}
                        pageParams={pageParams}
                        redirectTo={isResidential ? 'residence' : 'apartment'}
                        mapData={isResidential ? residenceClientData : objectClientData}
                    />
                ) : (
                    <div className={'container_md'}>
                        <CatalogProducts
                            i18n={i18n}
                            pageParams={pageParams}
                            redirectTo={isResidential ? 'residence' : 'apartment'}
                            metaData={isResidential ? residenceMetaData : apartmentMetaData}
                            catalogData={isResidential ? residenceListData : apartmentListData}
                        />
                    </div>
                )}
            </div>
        </StoreProvider>
    );
}

export default CatalogContainer;
