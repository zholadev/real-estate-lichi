

import {useMemo} from "react";

export const DOTS = "...";

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({length}, (_, index) => index + start);
};

/**
 * @author Zholaman Zhumanov
 * @name usePaginationRange
 * @param totalPageCount
 * @param buttonConst
 * @param siblingCount
 * @param currentPage
 * @returns {unknown}
 */
export const usePaginationRange = (
    {
        totalPageCount,
        buttonConst,
        siblingCount,
        currentPage,
    }
) => {
    return useMemo(() => {
        try {
            const totalPageNumbers = buttonConst + 2 + siblingCount;

            if (totalPageNumbers >= totalPageCount) {
                return range(1, totalPageCount);
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPageCount
            );

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPageCount;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 1 * siblingCount;
                let leftRange = range(1, leftItemCount);

                return [...leftRange, DOTS, totalPageCount];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                let rightItemCount = 3 + 1 * siblingCount;
                let rightRange = range(
                    totalPageCount - rightItemCount + 1,
                    totalPageCount
                );

                return [firstPageIndex, DOTS, ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                let middleRange = range(leftSiblingIndex, rightSiblingIndex);
                return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
            }
        } catch (error) {
            console.log(`page: paginationContainer, event: useMemo, error: ${error}`)
        }
    }, [totalPageCount, siblingCount, currentPage, buttonConst]);
};
