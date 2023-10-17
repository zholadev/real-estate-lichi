'use client'

import dynamic from "next/dynamic";
import {Tabs} from "@/shared/uikit/tabs";
import React, {useMemo, useState} from 'react';
import {CatalogProducts, Filter} from "@/components/catalog";

const MapController = dynamic(() => import('@/widgets/map/ui/MapController'), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 15.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogContainer(props) {
    const {i18n} = props

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
        <div>
            <Tabs i18n={i18n} tabData={tabData} onClick={setTypeCatalog}/>
            {
                typeCatalog === 'complex' ?
                    <>
                        <Filter i18n={i18n} onClick={toggleView}/>
                        {
                            typeContent === 'map' ?
                                <MapController/> :
                                <CatalogProducts redirectTo={'apartment'} i18n={i18n}/>
                        }
                    </>
                    :
                    <>
                        <Filter i18n={i18n} onClick={toggleView}/>
                        {
                            typeContent === 'map' ?
                                <MapController/> :
                                <CatalogProducts redirectTo={'object'} i18n={i18n}/>
                        }
                    </>
            }
        </div>
    );
}

export default CatalogContainer;
