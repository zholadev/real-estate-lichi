import React from 'react';
import {ObjectPage} from "@/components/object";
import {globalProps} from "@/entities/globalProps";
import {apiGetApartmentsByIdData} from "@/shared/services/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created
 * @param props
 * @returns {Element}
 * @constructor
 */
function Apartment(props) {
    const {i18n, apartmentData} = props

    return (
        <ObjectPage
            i18n={i18n}
            apartmentData={apartmentData}
        />
    )
}

export async function getServerSideProps(context) {
    try {
        const apartmentData = await apiGetApartmentsByIdData(context.query.id, context.locale)

        const data = apartmentData?.["data"]

        if (data?.error?.status === 404 || !data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                apartmentData: data || {},
                ...await globalProps(context)
            }
        }
    } catch (error) {
        console.log("An error has occurred")
    }
}


export default Apartment;
