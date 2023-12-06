import './global.sass'
import '@/styles/styles.sass'
import './reset.css'
import '@/styles/font.css'
import '@/styles/swiper-custom.sass'
import '@/styles/leaflet.css'
import 'react-loading-skeleton/dist/skeleton.css'
import {Navbar} from "@/widgets/navbar";
import {getDictionary} from "@/dictionaries";
import {Footer} from "@/widgets/footer";
import NextTopLoader from "nextjs-toploader";
import {cookies} from "next/headers";

export const metadata = {
    title: 'META TRUST-DUBAI',
    description: 'META TRUST-DUBAI',
}

export default async function RootLayout({children}) {
    const cookieStore = cookies()
    const lang = cookieStore.get('dubai_lang')?.value || 'en'

    const i18n = await getDictionary(lang)

    return (
        <html lang="en">
        <body>
        <NextTopLoader
            color="#000"
            showSpinner={false}
            zIndex={11000}
        />

        <Navbar i18n={i18n}/>
        <main>
            {children}
        </main>
        <Footer i18n={i18n}/>
        </body>
        </html>
    )
}
