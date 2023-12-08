import {cookies} from 'next/headers'
import {getDictionary} from "@/dictionaries";
import {MainPage} from "@/components/main";
import {apiGetApartmentsData, apiGetNewsData} from "@/shared/services/clientRequests";

async function getNewsData() {
    return apiGetNewsData(4, 1)
}

async function getApartmentData() {
    return apiGetApartmentsData(1, {'filters[property_type][type]': "apartment"})
}

async function getVillaData() {
    return apiGetApartmentsData(1, {'filters[property_type][type]': "villa"})
}

/**
 * @author Zholaman Zhumanov
 * @param lang
 * @returns {Promise<JSX.Element>}
 * @constructor
 */
export default async function Home({params}) {
    const newsData = await getNewsData()
    const apartmentData = await getApartmentData()
    const villaData = await getVillaData()

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={'page_top_size'}>
            <MainPage
                newsData={newsData?.["data"]?.["data"]}
                apartmentData={apartmentData?.["data"]?.["data"]}
                villaData={villaData?.["data"]?.["data"]}
                i18n={i18n}
            />
        </div>
    )
}
