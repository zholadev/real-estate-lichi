import {cookies} from 'next/headers'
import {getDictionary} from "@/dictionaries";
import {MainContainer} from "@/components/main";
import {apiGetApartmentsData, apiGetNewsData} from "@/shared/services/clientRequests";

async function getNewsData() {
    return apiGetNewsData(4, 1)
}

async function getApartmentData() {
    return apiGetApartmentsData()
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

    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <div className={'page_top_size'}>
            <MainContainer
                newsData={newsData?.["data"]?.["data"]}
                apartmentData={apartmentData?.["data"]?.["data"]}
                i18n={i18n}
            />
        </div>
    )
}
