import {MainPage} from "@/components/main";
import {apiGetApartmentsData, apiGetFilterResidenceList, apiGetNewsData} from "@/shared/services/clientRequests";
import {globalProps} from "@/entities/globalProps";

/**
 * @author Zholaman Zhumanov
 * @return {JSX.Element}
 * @constructor
 */
export default function Home(props) {
    const {apartmentData, newsData, villaData, residenceData, i18n} = props
    const parseResponseData = (response) => {
        return response?.["data"];
    }

    return (
        <div className={'page_top_size'}>
            <MainPage
                i18n={i18n}
                newsData={parseResponseData(newsData)}
                villaData={parseResponseData(villaData)}
                residenceData={parseResponseData(residenceData)}
                apartmentData={parseResponseData(apartmentData)}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const commonParams = {
        "pagination[pageSize]": "6",
        "populate": "name,short_description,photo_preview.item,id",
        "fields[0]": "name",
        "fields[1]": "short_description",
        "sort[0]": "createdAt:desc"
    };

    const newsParams = {
        "fields[0]": "title",
        "fields[1]": "short_description",
        "populate": "images",
        "sort[0]": "createdAt:desc"
    }

    const getApartmentData = async (type = "apartment") => {
        return await apiGetApartmentsData(1, {
            'filters[property_types][type]': type,
            ...commonParams
        });
    }

    const newsData = await apiGetNewsData(4, 1, newsParams);

    const apartmentData = await getApartmentData("apartment")
    const villaData = await getApartmentData("villa")

    const residenceData = await apiGetFilterResidenceList()

    return {
        props: {
            newsData: newsData || {},
            apartmentData: apartmentData || {},
            villaData: villaData || {},
            residenceData: residenceData || {},
            ...await globalProps(context)
        }
    }
}
