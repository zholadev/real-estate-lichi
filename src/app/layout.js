import './global.sass'
import '@/styles/styles.sass'
import './reset.css'
import '@/styles/font.css'
import '@/styles/swiper-custom.sass'
import '@/styles/leaflet.css'
import {Navbar} from "@/widgets/navbar";
import {getDictionary} from "@/dictionaries";
import {Footer} from "@/widgets/footer";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
    title: 'META TRAST-DUBAI',
    description: 'META TRAST-DUBAI new project',
}

export default async function RootLayout({children}) {
    const i18n = await getDictionary('ru')

    return (
        <html lang="en">
        <body>
        <NextTopLoader
            color="#000"
            showSpinner={false}
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
