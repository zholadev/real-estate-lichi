import React from 'react';
import {Button} from "@/shared/uikit/button";
import {PortalProvider} from "@/shared/portals";
import FilterList from "../filterList/FilterList";
import {SidebarContainer} from "@/widgets/sidebar";
import styles from "@/styles/catalog-filter.module.sass";
import {useMediaMaxState} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 14.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterSm(props) {
    const {
        i18n,
        priceFrom,
        priceValue,
        queryFilter,
        filterData,
        typeCatalog,
        toggleFilter,
        clearFilters,
        setPriceFrom,
        clearSelects,
        setPriceValue,
        sendFilterQuery,
        getMinMaxPrices,
        queryApiFilters,
        setFilterAllData,
        toggleFilterHandle,
        setApiFiltersHandle,
        setFilterQueryHandle,
    } = props

    const mediaQuerySm = useMediaMaxState({screenSize: 576.98})

    if (!mediaQuerySm) {
        return null
    }

    return (
        <PortalProvider>
            <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                <div className={styles['catalog_filter']}>
                    <FilterList
                        i18n={i18n}
                        priceFrom={priceFrom}
                        priceValue={priceValue}
                        queryFilter={queryFilter}
                        typeCatalog={typeCatalog}
                        clearSelect={clearSelects}
                        clearFilters={clearFilters}
                        setPriceFrom={setPriceFrom}
                        setPriceValue={setPriceValue}
                        queryApiFilters={queryApiFilters}
                        getMinMaxPrices={getMinMaxPrices}
                        setFilterAllData={setFilterAllData}
                        setApiFiltersHandle={setApiFiltersHandle}
                        setFilterQueryHandle={setFilterQueryHandle}
                    />

                    <Button
                        onClick={sendFilterQuery}
                        title={i18n?.["site"]?.["search_title"]}
                        disabled={filterData.length === 0}
                        style={{
                            opacity: filterData.length === 0 ? .3 : 1
                        }}
                    />

                    <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                </div>
            </SidebarContainer>
        </PortalProvider>
    );
}

export default FilterSm;
