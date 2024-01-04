'use client'

import {Tabs} from "@/shared/uikit/tabs";
import React, {useMemo, useState} from 'react';
import {useSearchParams} from "next/navigation";
import styles from '@/styles/catalog-products.module.sass'
import {CatalogProducts, Filter} from "@/components/catalog";
import CatalogMapProducts from "@/components/catalog/ui/mapProducts/CatalogMapProducts";
import {StoreProvider} from "@/entities/store";

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

    const [typeCatalog, setTypeCatalog] = useState('object')
    const [typeContent, setTypeContent] = useState('list')

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

    return (
        <StoreProvider>
            <div className={styles['catalog_products_list']}>
                <div className={'container_md mb-15'}>
                    <Tabs
                        i18n={i18n}
                        item={"title"}
                        url={'/catalog'}
                        tabData={tabData}
                        onClick={setTypeCatalog}
                        activeSelectName={"value"}
                        defaultValue={query.get('type') || tabData?.[0]?.["value"]}
                    />


                    <div className={'container_md'}>
                        <Filter
                            i18n={i18n}
                            onClick={toggleView}
                            pageParams={pageParams}
                            typeContent={typeContent}
                            typeCatalog={typeCatalog}
                            apartmentListData={apartmentListData}
                        />
                    </div>
                </div>
                {typeContent === 'map' ? (
                    <div className={'container_md_p_sm'}>
                        <CatalogMapProducts
                            i18n={i18n}
                            mapData={query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex' ? residenceListData : apartmentListData}
                            redirectTo={query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex' ? 'residence' : 'apartment'}
                        />
                    </div>
                ) : (
                    <div className={'container_md'}>
                        <CatalogProducts
                            metaData={query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex' ? residenceMetaData : apartmentMetaData}
                            catalogData={query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex' ? residenceListData : apartmentListData}
                            redirectTo={query.get('type') === 'residential_complex' || typeCatalog === 'residential_complex' ? 'residence' : 'apartment'}
                            i18n={i18n}
                        />
                    </div>
                )}
            </div>
        </StoreProvider>
    );
}

export default CatalogContainer;
