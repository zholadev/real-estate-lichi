'use client'

import React, {useState} from 'react';
import styles from '@/styles/catalog-products.module.sass'
import {CatalogCard} from "@/shared/uikit/cards/catalogCard";
import {PaginationContainer} from "@/shared/uikit/paginate";
import {usePathname, useRouter} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogProducts(props) {
    const {catalogData, i18n, redirectTo, apartmentMetaData} = props

    const router = useRouter()
    const pathname = usePathname()

    const [page, setPage] = useState(1)

    if (Object.values(catalogData || {}).length === 0) {
        return <h4>Ничего не найдено</h4>
    }

    const nextToPage = () => {
        setPage(page + 1)
        router.push(`${pathname}?page=${page}`)
    }

    const prevToPage = () => {
        setPage(page - 1)
        router.push(`${pathname}?page=${page}`)
    }

    const togglePage = (e) => {
        try {
            const pageNumber = Number(event.target.textContent);
            setPage(page + 1)
            router.push(`${pathname}?page=${pageNumber}`)
        } catch (error) {
            console.log(`page: orderBox, event: changePage, error: ${error}`)
        }
    }

    return (
        <div className={styles['catalog_product_list']}>
            {
                Object.values(catalogData || {}).map((cardItem) => {
                    return (
                        <CatalogCard
                            key={cardItem?.["id"]}
                            i18n={i18n}
                            redirectUrl={redirectTo}
                            cardData={cardItem}
                            cardDataInfo={cardItem?.["attributes"]}
                        />
                    )
                })
            }

            {
                // apartmentMetaData &&
                <PaginationContainer
                    totalPageCount={apartmentMetaData?.["pagination"]?.["pageCount"]}
                    goToNextPage={nextToPage}
                    gotToPreviousPage={prevToPage}
                    buttonConst={2}
                    siblingCount={1}
                    maxPage={apartmentMetaData?.["pagination"]?.["total"]}
                    changePage={togglePage}
                    currentPage={page}
                />
            }
        </div>
    );
}

export default CatalogProducts;
