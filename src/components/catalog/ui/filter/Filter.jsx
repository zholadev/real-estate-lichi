'use client'

import React, {useCallback, useState} from 'react';
import styles from '@/styles/catalog-filter.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";
import {PortalProvider} from "@/shared/portals";
import {SidebarContainer} from "@/widgets/sidebar";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Filter(props) {
    const {filterData, i18n, onClick, typeCatalog} = props

    const [toggleFilter, setToggleFilter] = useState(false)

    const toggleFilterHandle = useCallback(() => {
        setToggleFilter(!toggleFilter)
    }, [toggleFilter])

    return (
        <>
            <div className={styles['catalog_filter_lg']}>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <div className={styles['filter_switch_btn']}>
                    <Button
                        type={'primary_animate'}
                        title={'Список'}
                        onClick={onClick}
                        animateActive={typeCatalog === 'list'}
                    />
                    <Button
                        type={'primary_animate'}
                        title={i18n?.["site"]?.["select_map_title"]}
                        onClick={onClick}
                        animateActive={typeCatalog === 'map'}
                    />
                </div>
                <Button title={i18n?.["site"]?.["search_title"]}/>
            </div>

            <div className={styles['filter_sm_action']} onClick={toggleFilterHandle}>
                <div className={styles['menu']}>
                    <div className={`${styles['item']} ${styles['item_1']}`}></div>
                    <div className={`${styles['item']} ${styles['item_2']}`}></div>
                    <div className={`${styles['item']} ${styles['item_3']}`}></div>
                </div>
                <span className={styles['text']}>Больше фильтров</span>
            </div>
            <div className={styles['catalog_filter_sm']}>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                <div className={styles['filter_switch_btn']}>
                    <Button
                        type={'primary_animate'}
                        title={'Список'}
                        onClick={onClick}
                        animateActive={typeCatalog === 'list'}
                    />
                    <Button
                        type={'primary_animate'}
                        title={i18n?.["site"]?.["select_map_title"]}
                        onClick={onClick}
                        animateActive={typeCatalog === 'map'}
                    />
                </div>
                <Button title={i18n?.["site"]?.["search_title"]}/>
            </div>

            <PortalProvider>
                <SidebarContainer active={toggleFilter} toggle={toggleFilterHandle}>
                    <div className={styles['catalog_filter']}>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <FormSelect placeholder={i18n?.["form"]?.["selected"]}/>
                        <div className={styles['filter_switch_btn']}>
                            <Button
                                type={'primary_animate'}
                                title={'Список'}
                                onClick={onClick}
                                animateActive={typeCatalog === 'list'}
                            />
                            <Button
                                type={'primary_animate'}
                                title={i18n?.["site"]?.["select_map_title"]}
                                onClick={onClick}
                                animateActive={typeCatalog === 'map'}
                            />
                        </div>
                        <Button title={i18n?.["site"]?.["search_title"]}/>
                    </div>
                </SidebarContainer>
            </PortalProvider>
        </>

    );
}

export default Filter;
