import React from 'react';
import styles from "@/styles/about-page.module.sass";
import Image from "next/image";
import {PAGE} from "@/shared/constants/constants";
import {Button} from "@/shared/uikit/button";

function Content({i18n}) {
    return (
        <div className={styles['faq_info']}>
            <div className={styles['top_info']}>
                <p>{i18n?.["page.about.description.significance"]}</p>
                <p>{i18n?.["page.about.description.development.model"]}</p>
            </div>

            <Image
                priority={true}
                width={1024}
                height={768}
                src={PAGE.about.aboutPageObject['src']}
                alt="about page tab"
                className={styles['img']}
            />
            <Button
                type={'secondary'}
                title={i18n?.["site"]?.["get_object"]}
            />
        </div>
    )
}

export default Content;
