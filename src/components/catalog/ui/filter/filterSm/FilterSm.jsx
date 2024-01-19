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
        filterData,
        queryFilter,
        typeCatalog,
        toggleFilter,
        clearFilters,
        setPriceFrom,
        clearSelects,
        setPriceValue,
        sendFilterQuery,
        buttonMainTitle,
        getMinMaxPrices,
        getApartmentData,
        queryApiFilters,
        setFilterAllData,
        toggleFilterHandle,
        setApiFiltersHandle,
        setFilterQueryHandle,
        filterApartmentApiData,
        buttonEventClickDisabled
    } = props

    const mediaQuerySm = useMediaMaxState({screenSize: 576.98})

    if (!mediaQuerySm) {
        return null
    }

    return (
        <PortalProvider>
            <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                <div className={styles['filter_mobile_list']}>
                    <div className={styles['filter_list_content_scroll']}>
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
                            getMinMaxPrices={getMinMaxPrices}
                            queryApiFilters={queryApiFilters}
                            setFilterAllData={setFilterAllData}
                            getApartmentData={getApartmentData}
                            setApiFiltersHandle={setApiFiltersHandle}
                            setFilterQueryHandle={setFilterQueryHandle}
                            filterApartmentApiData={filterApartmentApiData}
                        />
                    </div>

                   <div className={styles['filter_sm_action_btn']}>
                       <Button
                           onClick={sendFilterQuery}
                           title={buttonMainTitle}
                           disabled={buttonEventClickDisabled}
                           style={{
                               opacity: buttonEventClickDisabled ? .3 : 1
                           }}
                       />

                       <Button title={i18n?.["filter.clear.title"]} type={'outline'} onClick={clearFilters}/>
                   </div>
                </div>
            </SidebarContainer>
        </PortalProvider>
    );
}

export default FilterSm;
