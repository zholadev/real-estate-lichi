'use client'

import React, {useMemo} from 'react';
import ObjectLayout from "./ObjectLayout";
import {PageMapInfo} from "@/shared/uikit/map";
import {Breadcrumbs} from "@/shared/breadcrumbs";
import ObjectDetailPreview from "./ObjectDetailPreview";
import ObjectPaymentPlan from "./ObjectPaymentPlan";
import ObjectDetailDescription from "./ObjectDetailDescription";
import {log} from "three/nodes";

/**
 * @author Zholaman Zhumanov
 * @created
 * @param props
 * @returns {Element}
 * @constructor
 */
function ObjectPage(props) {
    const {i18n, apartmentData} = props

    const objectData = useMemo(() => {
        return {
            "total": apartmentData,
            "name": apartmentData?.["attributes"]?.["name"],
            "description": apartmentData?.["attributes"]?.["description"],
            "photos": apartmentData?.["attributes"]?.["photos"],
            "price": apartmentData?.["attributes"]?.["price"],
            "tags": apartmentData?.["attributes"]?.["tags"]?.["data"],
            "build_info": apartmentData?.["attributes"]?.["build_info"],
            "residence": apartmentData?.["attributes"]?.["residence"]?.["data"]?.["attributes"],
            "district": apartmentData?.["attributes"]?.["district"]?.["data"]?.["attributes"],
            "payment_plan": apartmentData?.["attributes"]?.["payment_plan"],
            "locate": apartmentData?.["attributes"]?.["locate"],
            "attractions": apartmentData?.["attributes"]?.["attractions"]?.["data"],
            "managers": apartmentData?.["attributes"]?.["managers"],
            "layouts": apartmentData?.["attributes"]?.["layouts"]?.[0],
            "country": apartmentData?.["attributes"]?.["country"]?.["data"]?.["attributes"],
        }
    }, [apartmentData])

    return (
        <div className={'container_lg page_top_size'}>
            <Breadcrumbs
                i18n={i18n}
                page={'apartment'}
                pageName={objectData?.["name"]}
            />

            <ObjectDetailPreview
                i18n={i18n}
                data={objectData}
            />

            <ObjectDetailDescription
                i18n={i18n}
                data={objectData}
            />

            <ObjectPaymentPlan
                i18n={i18n}
                data={objectData?.["payment_plan"]}
            />

            <ObjectLayout
                i18n={i18n}
                data={objectData?.["layouts"]}
            />

            <PageMapInfo
                cluster
                isPopup
                i18n={i18n}
                type={'apartments'}
                currentData={objectData?.["locate"]}
                attractionsData={objectData?.["attractions"]}
            />
        </div>
    );
}

export default ObjectPage;
