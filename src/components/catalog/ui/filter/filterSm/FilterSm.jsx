import React from 'react';
import {Button} from "@/shared/uikit/button";
import {PortalProvider} from "@/shared/portals";
import {useMediaMaxState} from "@/shared/hooks";
import FilterList from "../filterList/FilterList";
import {SidebarContainer} from "@/widgets/sidebar";
import styles from "@/styles/catalog-filter.module.sass";
import useSendFilters from "../../../lib/useSendFilters";
import useGetMinMaxPrice from "../../../lib/useGetMinMaxPrice";

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
        toggleFilter,
        clearFilters,
        buttonMainTitle,
        getApartmentData,
        toggleFilterHandle,
        setApiFiltersHandle,
        setFilterQueryHandle,
        buttonEventClickDisabled
    } = props

    const filterSend = useSendFilters()
    const getMinMaxPrices = useGetMinMaxPrice()

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
                            clearFilters={clearFilters}
                            getMinMaxPrices={getMinMaxPrices}
                            getApartmentData={getApartmentData}
                            setApiFiltersHandle={setApiFiltersHandle}
                            setFilterQueryHandle={setFilterQueryHandle}
                        />
                    </div>

                   <div className={styles['filter_sm_action_btn']}>
                       <Button
                           onClick={filterSend}
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
