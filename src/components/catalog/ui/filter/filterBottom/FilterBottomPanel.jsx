'use client'

import React, {useMemo} from 'react';
import {Button} from "@/shared/uikit/button";
import styles from "@/styles/catalog-filter.module.sass";
import {useMediaMaxState} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 05.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function FilterBottomPanel(props) {
    const {
        i18n,
        onClick,
        filterData,
        typeContent,
        clearFilters,
        filterAllData = [],
        sendFilterQuery,
        queryFilterData,
        filterClearHandle,
        filterApiClearHandle,
    } = props

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const switchBtnOnClick = () => {
        clearFilters()
        onClick()
    }

    /**
     * @description Получаем данные которые уже активны, нужны полные данные активных фильтров
     * @type {(*&{key: *})[]}
     */
    const filteringAllData = useMemo(() => {
        try {
            const getType = (item) => item?.["attributes"]?.["type"];

            const filterDataByType = (data, type) =>
                data.filter(item => queryFilterData.find(filter => filter?.[1] === getType(item)));

            const mapDataWithKey = (data) =>
                data.map(item => {
                    const match = queryFilterData.find(filter => getType(item) === filter?.[1]);
                    return {
                        ...item,
                        key: match?.[0]
                    }
                });

            const filteredData = filterDataByType(filterAllData, "type");
            return mapDataWithKey(filteredData);
        } catch (error) {
            errorHandler("FilterBottomPanel", "func - filteringAllData", error)
        }
    }, [filterAllData, queryFilterData])

    return (
        <div className={styles['filter_panel']}>
            {
                !mediaQuerySm &&
                <ul className={styles['filter_list_actions']}>
                    {
                        filteringAllData.map((filter, id) => {
                            return (
                                <li
                                    key={id}
                                    onClick={async () => {
                                        if (queryFilterData?.length === 1) {
                                            await clearFilters();
                                        }

                                        filterClearHandle({key: filter?.["key"], value: null})
                                        filterApiClearHandle({
                                            key: filter?.["key"] === 'residence' ? `filters[apartments][residence][name][$contains]` : `filters[apartments][${filter?.["key"]}][type]`,
                                            value: null
                                        })

                                        sendFilterQuery({key: filter?.["key"], value: null}, true)
                                    }}
                                >
                                    <span>{filter?.["attributes"]?.["name"]}</span> <i className={styles['icon']}></i>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            <div className={styles['filter_switch_actions']}>
                {
                    queryFilterData.length > 0 || filterData.length > 0 ?
                        (
                            <Button
                                type={'outline_light'}
                                title={i18n?.["filter.clear.title"]}
                                onClick={clearFilters}
                                style={{
                                    fontSize: mediaQuerySm ? "18px" : "13px",
                                    lineHeight: "18.2px"
                                }}
                            />
                        ) : (
                            <div></div>
                        )
                }

                <div className={styles['switch_btn']}>
                    <Button
                        type={'primary_animate'}
                        onClick={switchBtnOnClick}
                        animateActive={typeContent === 'list'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px"
                        }}
                    >
                        <i className={`${styles['icon']} ${typeContent === "list" ? styles['invert_icon'] : ''} ${styles['icon_list']}`}/>
                    </Button>

                    <Button
                        type={'primary_animate'}
                        onClick={switchBtnOnClick}
                        animateActive={typeContent === 'map'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px"
                        }}
                    >
                        <i className={`${styles['icon']} ${typeContent === "map" ? styles['invert_icon'] : ''} ${styles['icon_marker']}`}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FilterBottomPanel;
