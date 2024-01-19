import React from 'react';
import {TagListSecondary} from "@/shared/uikit/tags";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @last-updated 19.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ResidenceList(props) {
    const {data} = props

    if (!data) {
        return null
    }

    return <TagListSecondary listTags={data}/>
}

export default ResidenceList;
