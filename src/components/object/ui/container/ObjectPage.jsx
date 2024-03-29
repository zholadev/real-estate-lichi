

import React, {useMemo} from 'react';
import DetailLayout from "../DetailLayout";
import {AttractionsLocation} from "@/shared/uikit/map";
import {Breadcrumbs} from "@/entities/breadcrumbs";
import {extractAttribute} from "@/shared/utilites";
import PaymentPlan from "../PaymentPlan";
import ObjectDetailPreview from "../ObjectDetailPreview";
import DetailDescription from "../DetailDescription";

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
            "name": extractAttribute('name', apartmentData),
            "description": extractAttribute('description', apartmentData),
            "photos": extractAttribute('photos', apartmentData),
            "price": extractAttribute('price', apartmentData),
            "tags": extractAttribute('tags.data', apartmentData),
            "build_info": extractAttribute('build_info', apartmentData),
            "residence": extractAttribute('residence.data.attributes', apartmentData),
            "district": extractAttribute('districts.data.0.attributes', apartmentData),
            "payment_plan": extractAttribute('payment_plan', apartmentData),
            "locate": extractAttribute('locate', apartmentData),
            "attractions": extractAttribute('attractions.data', apartmentData),
            "managers": extractAttribute('managers', apartmentData),
            "layouts": extractAttribute('layouts.0', apartmentData),
            "country": extractAttribute('country.data.attributes', apartmentData),
            "rooms": extractAttribute('rooms.data.0.attributes', apartmentData),
        }
    }, [apartmentData])

    return (
        <>
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

                <DetailDescription
                    i18n={i18n}
                    data={objectData}
                />

                <PaymentPlan
                    i18n={i18n}
                    data={objectData?.["payment_plan"]}
                />

                <DetailLayout
                    i18n={i18n}
                    data={objectData?.["layouts"]}
                />
            </div>
            <AttractionsLocation
                cluster
                isPopup
                i18n={i18n}
                type={'apartments'}
                sliderCardCountView={6.2}
                currentData={objectData?.["locate"]}
                attractionsData={objectData?.["attractions"]}
            />
        </>

    );
}

export default ObjectPage;
