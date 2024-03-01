import React from 'react';
import {ResidencePage} from "@/components/residence";
import {apiGetResidentialByIdData} from "@/shared/services/clientRequests";
import {globalProps} from "@/entities/globalProps";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Residence(props) {
    const {i18n, residenceData, id} = props

    return (
        <ResidencePage
            id={id}
            i18n={i18n}
            residenceData={residenceData}
        />
    )
}

export async function getServerSideProps(context) {
    try {
        const residenceData = await apiGetResidentialByIdData(context.query.id)

        const data = residenceData?.["data"]

        if (data?.error?.status === 404 || !data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                residenceData: data || {},
                id: context.query.id,
                ...await globalProps(context)
            }
        }
    } catch (error) {
        console.log("An error has occurred")
    }
}


export default Residence;
