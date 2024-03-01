import {useMemo} from 'react';
import {useRouter} from 'next/router'
import {useParams, usePathname} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 16.01.2024
 * @returns {boolean}
 */
function useContentSize() {
    const router = useRouter()
    const pathname = usePathname()
    const routerParams = useParams()

    const isMinimumContent = (pathname, routerParams) => {
        const basePaths = ['/', '/catalog/', '/news/', `/news/${routerParams['id']}/`];
        return basePaths.some(basePath => pathname === basePath);
    }

    return useMemo(
        () => isMinimumContent(pathname, routerParams),
        [routerParams, pathname]
    );
}

export default useContentSize;
