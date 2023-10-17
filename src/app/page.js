import {getDictionary} from "@/dictionaries";
import {MainContainer} from "@/components/main";

export default async function Home({params: {lang}}) {
    const i18n = await getDictionary('ru')

    return (
        <div className={'page_top_size'}>
            <MainContainer i18n={i18n} />
        </div>
    )
}
