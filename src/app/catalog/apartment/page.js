import React from 'react';
import {getDictionary} from "@/dictionaries";
import {ApartmentsPageContainer} from "@/components/apartments";

/**
 * @author Zholaman Zhumanov
 * @created
 * @param props
 * @returns {Element}
 * @constructor
 */
export default async function Page(props) {
    const i18n = await getDictionary('ru')

    return (<ApartmentsPageContainer i18n={i18n}/>);
}

// https://player.vimeo.com/progressive_redirect/playback/874470463/rendition/1080p/file.mp4?loc=external&signature=c4523c43201260fa4ee74e0ba437aea97058fba33ed52acf1a9cb22b1e6dc93e
