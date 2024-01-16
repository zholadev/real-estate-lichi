'use client'

import {useMemo} from 'react';
import {useParams, usePathname} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 16.01.2024
 * @returns {boolean}
 */
function useContentSize() {
    const pathname = usePathname()
    const routerParams = useParams()

    const isMinimumContent = (pathname, routerParams) => {
        const basePaths = ['', 'catalog', 'news', `news/${routerParams['id']}`];
        return basePaths.some(basePath => pathname === `/${routerParams['lang']}/${basePath}`);
    }

    console.log(isMinimumContent('', routerParams))

    return useMemo(
        () => isMinimumContent(pathname, routerParams),
        [routerParams, pathname]
    );
}

export default useContentSize;
