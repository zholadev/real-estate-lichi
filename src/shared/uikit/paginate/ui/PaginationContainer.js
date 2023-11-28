'use client'

import React from 'react';
import {useSelector} from "react-redux";
import styles from '@/styles/lib-pagination.module.sass';
import {AnimateSharedLayout, motion} from "framer-motion";
import {DOTS, usePaginationRange} from "@/shared/pagination/pagination";

/**
 * @author Zholaman Zhumanov
 * @name paginationContainer
 * @param props
 * @returns {false|JSX.Element}
 * @constructor
 */
function PaginationContainer(props) {
    const {
        goToNextPage,
        gotToPreviousPage,
        totalPageCount,
        buttonConst,
        siblingCount,
        currentPage,
        changePage,
        maxPage,
    } = props

    const theme = 'light'

    const paginationRange = usePaginationRange({
        totalPageCount,
        buttonConst,
        siblingCount,
        currentPage,
    });

    return (
        maxPage > 1 && <div
            className={`${styles['pagination_container']} ${theme === 'dark' ? styles['pagination_container__dark'] : ''}`}>
            {/*<button*/}
            {/*    aria-label={'page toggle prev'}*/}
            {/*    onClick={gotToPreviousPage}*/}
            {/*    className={`${styles['pagination_btn']} ${currentPage === 1 ? styles['disabled_btn'] : ""}`}*/}
            {/*>*/}
            {/*    Назад*/}
            {/*</button>*/}
            {paginationRange?.map((item, index) => {
                if (item === DOTS) {
                    return (
                        <button aria-label={'dots pages'} key={index} className={styles['pagination_item']}>
                            &#8230;
                        </button>
                    );
                }
                return (
                    <button
                        aria-label={'pagination'}
                        key={index}
                        onClick={changePage}
                        className={`${styles['pagination_item']} ${
                            currentPage === item ? styles['pagination_active'] : null
                        }`}
                    >
                        {item}
                    </button>
                )
            })}
            {/*<button*/}
            {/*    aria-label={'next'}*/}
            {/*    onClick={goToNextPage}*/}
            {/*    className={`${styles['pagination_btn']} ${currentPage === totalPageCount ? styles['disabled_btn'] : ""}`}*/}
            {/*>*/}
            {/*    Дальше*/}
            {/*</button>*/}
        </div>
    );
}

export default PaginationContainer;
