import React from 'react';
import {Button} from "@/shared/uikit/button";
import styles from "@/styles/catalog-filter.module.sass";

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
        sendFilterQuery,
        queryFilterData,
        filterClearHandle,
        filterApiClearHandle,
    } = props

    return (
        <div className={styles['filter_panel']}>
            <ul className={styles['filter_list_actions']}>
                {
                    queryFilterData.map(([key, value], id) => {
                        return (
                            <li
                                key={id}
                                onClick={async () => {
                                    if (queryFilterData?.length === 1) {
                                        await clearFilters();
                                    }

                                    filterClearHandle({key: key, value: null})
                                    filterApiClearHandle({
                                        key: key === 'residence' ? `filters[apartments][residence][name][$contains]` : `filters[apartments][${key}][type]`,
                                        value: null
                                    })

                                    sendFilterQuery({key: key, value: null})
                                }}
                            >
                                <span>{key}</span> <i className={styles['icon']}></i>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={styles['filter_switch_actions']}>
                {
                    queryFilterData.length > 0 || filterData.length > 0 ?
                        (
                            <Button
                                type={'outline_light'}
                                title={i18n?.["filter.clear.title"]}
                                onClick={clearFilters}
                                style={{
                                    fontSize: "13px",
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
                        onClick={onClick}
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
                        onClick={onClick}
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
