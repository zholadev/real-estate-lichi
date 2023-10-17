import React, {useMemo} from 'react';
import styles from '@/styles/catalog-products.module.sass'
import {CatalogCard} from "@/shared/uikit/cards/catalogCard";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CatalogProducts(props) {
    const {catalogData, i18n, redirectTo} = props

    const data = useMemo(() => {
        return [
            {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            }, {
                card: "card"
            },
        ]
    }, [])

    return (
        <div className={styles['catalog_product_list']}>
            {
                data.map((item, id) => {
                    return (
                        <CatalogCard
                            key={id}
                            i18n={i18n}
                            redirectUrl={redirectTo}
                        />
                    )
                })
            }
        </div>
    );
}

export default CatalogProducts;
