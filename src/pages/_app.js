import "@/styles/font.css"
import "@/styles/reset.css"
import "@/styles/global.sass";
import "@/styles/styles.sass"
import '@/styles/leaflet.css'
import "@/styles/swiper-custom.sass"
import {Navbar} from "@/widgets/navbar";
import {Footer} from "@/widgets/footer";
import NextTopLoader from "nextjs-toploader";
import 'react-toastify/dist/ReactToastify.css'
import {StoreProvider} from "@/entities/store";
import 'react-loading-skeleton/dist/skeleton.css'
import {Slide, ToastContainer} from "react-toastify";
import {PageContainer} from "@/app/page";

export default function App({Component, pageProps}) {
    return (
        <StoreProvider>
            <NextTopLoader
                color="#000"
                showSpinner={false}
                zIndex={10010}
            />

            <ToastContainer
                position={'top-right'}
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                className="toast-container"
                theme={"colored"}
                transition={Slide}
            />

            <Navbar i18n={pageProps?.i18n}/>
            <main>
                <PageContainer>
                    <Component {...pageProps} />;
                </PageContainer>
            </main>
            <Footer i18n={pageProps?.i18n}/>
        </StoreProvider>
    )
}
