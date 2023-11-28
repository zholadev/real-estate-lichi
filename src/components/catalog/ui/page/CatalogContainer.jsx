'use client'

import {Tabs} from "@/shared/uikit/tabs";
import {Button} from "@/shared/uikit/button";
import React, {useMemo, useState} from 'react';
import {CatalogProducts, Filter} from "@/components/catalog";
import styles from '@/styles/catalog-products.module.sass'
import CatalogMapProducts from "@/components/catalog/ui/mapProducts/CatalogMapProducts";

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogContainer(props) {
    const {i18n, residenceListData, apartmentListData, apartmentMetaData, residenceMetaData, pageParams} = props

    const [typeCatalog, setTypeCatalog] = useState('object')
    const [typeContent, setTypeContent] = useState('list')

    const tabData = useMemo(() => {
        try {
            return [
                {
                    id: 1,
                    value: "object",
                    title: i18n?.["site"]?.["objects"]
                },
                {
                    id: 2,
                    value: "complex",
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
        <div className={styles['catalog_products_list']}>
            <div className={'container_md mb-15'}>
                <Tabs
                    i18n={i18n}
                    tabData={tabData}
                    onClick={setTypeCatalog}
                    item={"title"}
                    activeSelectName={"value"}
                />
                <div className={styles['filter_switch_btn']}>
                    <Button
                        type={'primary_animate'}
                        title={i18n?.["site"]?.["list.title"]}
                        onClick={toggleView}
                        animateActive={typeContent === 'list'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px"
                        }}
                    />
                    <Button
                        type={'primary_animate'}
                        title={i18n?.["site"]?.["select_map_title"]}
                        onClick={toggleView}
                        animateActive={typeContent === 'map'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px"
                        }}
                    />
                </div>
            </div>
            {
                typeCatalog === 'complex' ?
                    <>
                        <div className={'container_md'}>
                            <Filter typeCatalog={typeContent} i18n={i18n} onClick={toggleView}/>
                        </div>
                        {
                            typeContent === 'map' ?
                                <div className={'container_md_p_sm'}>
                                    <CatalogMapProducts
                                        i18n={i18n}
                                        mapData={residenceListData}
                                        redirectTo={'residence'}
                                    />
                                </div>
                                :
                                <div className={'container_md'}>
                                    <CatalogProducts
                                        metaData={residenceMetaData}
                                        catalogData={residenceListData}
                                        redirectTo={'residence'}
                                        i18n={i18n}
                                    />
                                </div>
                        }
                    </>
                    :
                    <>
                        <div className={'container_md'}>
                            <Filter typeCatalog={typeContent} i18n={i18n} onClick={toggleView}/>
                        </div>
                        {
                            typeContent === 'map' ?
                                <div className={'container_md_p_sm'}>
                                    <CatalogMapProducts
                                        i18n={i18n}
                                        mapData={apartmentListData}
                                        redirectTo={'apartment'}
                                    />
                                </div>
                                :
                                <div className={'container_md'}>
                                    <CatalogProducts
                                        metaData={apartmentMetaData}
                                        catalogData={apartmentListData}
                                        redirectTo={'apartment'}
                                        i18n={i18n}
                                    />
                                </div>
                        }
                    </>
            }
        </div>
    );
}

export default CatalogContainer;
