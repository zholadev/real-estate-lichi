'use client'

import React, {useState} from 'react';
import styles from '@/styles/catalog-products.module.sass'
import {CatalogCard} from "@/shared/uikit/cards/catalogCard";
import {PaginationContainer} from "@/shared/uikit/paginate";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Animation} from "@/shared/uikit/animation";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogProducts(props) {
    const {catalogData, i18n, redirectTo, metaData} = props

    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const PAGE_DEFAULT_VALUE = parseFloat(params.get('page')) || 1

    const [page, setPage] = useState(PAGE_DEFAULT_VALUE)

    const nextToPage = () => {
        setPage(page => page + 1)
        router.push(`${pathname}?page=${page}`)
    }

    const prevToPage = () => {
        setPage(page => page - 1)
        router.push(`${pathname}?page=${page}`)
    }

    const togglePage = (e) => {
        try {
            const pageNumber = Number(e.target.textContent);
            setPage(pageNumber)
            router.push(`${pathname}?page=${pageNumber}`)
        } catch (error) {
            console.log(`page: orderBox, event: changePage, error: ${error}`)
        }
    }

    if (Object.values(catalogData || {}).length === 0) {
        return <h4>{i18n?.["site.not_found.title"]}</h4>
    }

    return (
        <div className={styles['catalog_product_list']}>
            {
                Object.values(catalogData || {}).map((cardItem, index) => {
                    return (
                       <Animation
                           key={cardItem?.["id"]}
                           isIntersection
                           dontRepeat
                           style={{transitionDelay: index * 0.0120 + 's'}}
                       >
                           <CatalogCard
                               i18n={i18n}
                               redirectUrl={redirectTo}
                               cardData={cardItem}
                               cardDataInfo={cardItem?.["attributes"]}
                           />
                       </Animation>
                    )
                })
            }

            {
                metaData?.["pagination"]?.["pageCount"] > 1 &&
                <PaginationContainer
                    totalPageCount={metaData?.["pagination"]?.["pageCount"]}
                    goToNextPage={nextToPage}
                    gotToPreviousPage={prevToPage}
                    buttonConst={3}
                    siblingCount={1}
                    maxPage={metaData?.["pagination"]?.["total"]}
                    changePage={togglePage}
                    currentPage={page}
                />
            }
        </div>
    );
}

export default CatalogProducts;
