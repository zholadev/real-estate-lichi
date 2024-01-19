import {cookies} from 'next/headers'
import {MainPage} from "@/components/main";
import {getDictionary} from "@/dictionaries";
import {cookiesName} from "@/shared/constants/options";
import {apiGetApartmentsData, apiGetFilterResidenceList, apiGetNewsData} from "@/shared/services/clientRequests";

async function getPropertyData(type) {
    const commonParams = {
        "pagination[pageSize]": "6",
        "populate": "name,short_description,photo_preview.item,id",
        "fields[0]": "name",
        "fields[1]": "short_description",
        "sort[0]": "createdAt:desc"
    };

    return apiGetApartmentsData(1, {
        'filters[property_types][type]': type,
        ...commonParams
    });
}

async function getNewsData() {
    const newsParams = {
        "fields[0]": "title",
        "fields[1]": "short_description",
        "populate": "images",
        "sort[0]": "createdAt:desc"
    }

    return apiGetNewsData(4, 1, newsParams);
}

async function getResidenceListData() {
    return apiGetFilterResidenceList()
}

function parseResponseData(response) {
    return response?.["data"]?.["data"];
}

/**
 * @author Zholaman Zhumanov
 * @param lang
 * @returns {Promise<JSX.Element>}
 * @constructor
 */
export default async function Home({params}) {
    const [newsData, apartmentData, villaData, residenceData] = await Promise.all([
        getNewsData(),
        getPropertyData("apartment"),
        getPropertyData("villa"),
        getResidenceListData(),
    ]);

    const cookieStore = cookies();
    const lang = cookieStore.get(cookiesName.lang)?.value || 'en';
    const i18n = await getDictionary(lang);

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
