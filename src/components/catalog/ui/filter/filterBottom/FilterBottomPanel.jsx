import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button} from "@/shared/uikit/button";
import styles from "@/styles/catalog-filter.module.sass";
import {useDispatchHandler, useMediaMaxState} from "@/shared/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {Animation} from "@/shared/uikit/animation";
import useFilterGetKey from "@/components/catalog/lib/useFilterGetKey";
import {useAppSelector} from "@/entities/store/hooks/hooks";

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
        filterData,
        clearFilters,
        filterAllData = [],
        sendFilterQuery,
        queryFilterData,
        filterClearHandle,
        filterApiClearHandle,
    } = props

    const timerAnimateTriggerRef = useRef(null)

    const app = useDispatchHandler()

    const filterGetCurrentKey = useFilterGetKey()
    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const {
        catalogContent,
    } = useAppSelector(state => state?.catalog)

    const [filterTabAnimateTrigger, setFilterTabAnimateTrigger] = useState(false)

    /**
     * @author Zholaman Zhumanov
     * @description Переключение вида для каталога
     * @type {(function(): void)|*}
     */
    const toggleContentView = useCallback(() => {
        if (catalogContent !== 'map') {
            app.catalogTypeAction('map')
        } else {
            app.catalogTypeAction('list')
        }
    }, [catalogContent])

    /**
     * @author Zholaman Zhumanov
     * @description Очистка фильтра и переключение вида каталога
     */
    const switchBtnOnClick = () => {
        clearFilters()
        toggleContentView()
    }

    /**
     * @author Zholaman Zhumanov
     * @description Получаем данные которые уже активны, нужны полные данные активных фильтров
     * @type {(*&{key: *})[]}
     */
    const filteringAllData = useMemo(() => {
        try {
            const getType = (item, type) => {
                if (type === 'residence') {
                    return item?.["attributes"]?.["name"];
                } else {
                    return item?.["attributes"]?.["type"];
                }
            }

            const filterDataByType = (data) => data.filter(item => queryFilterData.find(filter => {
                const FILTER_KEY_VALUE = filter?.[0]
                const FILTER_CHILD_VALUE = filter?.[1]
                const FILTER_CHILD_VALUE_MAP = Object.values(filter?.[1] || {})

                if (FILTER_KEY_VALUE === 'residence') {
                    if (Array.isArray(FILTER_CHILD_VALUE)) {
                        return FILTER_CHILD_VALUE_MAP.some((filterChild) => filterChild === getType(item, FILTER_KEY_VALUE))
                    } else {
                        return FILTER_CHILD_VALUE === getType(item, FILTER_KEY_VALUE)
                    }
                } else {
                    if (Array.isArray(FILTER_CHILD_VALUE)) {
                        return FILTER_CHILD_VALUE_MAP.some((filterChild) => filterChild === getType(item))
                    } else {
                        return FILTER_CHILD_VALUE === getType(item)
                    }
                }
            }));

            const mapDataWithKey = (data) =>
                data.map(item => {
                    const match = queryFilterData.find(filter => {
                        const FILTER_KEY_VALUE = filter?.[0]
                        const FILTER_CHILD_VALUE = filter?.[1]
                        const FILTER_CHILD_VALUE_MAP = Object.values(filter?.[1] || {})


                        if (FILTER_KEY_VALUE === 'residence') {
                            if (Array.isArray(FILTER_CHILD_VALUE)) {
                                return FILTER_CHILD_VALUE_MAP.some((filterChild) => getType(item, FILTER_KEY_VALUE) === filterChild)
                            } else {
                                return getType(item, FILTER_KEY_VALUE) === FILTER_CHILD_VALUE
                            }
                        } else {
                            if (Array.isArray(FILTER_CHILD_VALUE)) {
                                return FILTER_CHILD_VALUE_MAP.some((filterChild) => getType(item) === filterChild)
                            } else {
                                return getType(item) === FILTER_CHILD_VALUE
                            }
                        }
                    });

                    return {
                        ...item,
                        key: match?.[0]
                    }
                });

            const priceFromValue = 'price.from'
            const priceToValue = 'price.to'

            const priceFrom = queryFilterData.find((filter) => filter?.[0] === priceFromValue)
            const priceTo = queryFilterData.find((filter) => filter?.[0] === priceToValue)


            const filteredData = filterDataByType(filterAllData, "type");

            const generatePriceItem = (price, priceValue) => {
                return {
                    attributes: {
                        "name": price?.[1],
                        "value": price?.[1],
                    },
                    key: priceValue
                };
            };

            if (priceTo && !priceFrom) {
                return [
                    generatePriceItem(priceTo, priceToValue),
                    ...mapDataWithKey(filteredData)
                ]
            } else if (priceFrom && !priceTo) {
                return [
                    generatePriceItem(priceFrom, priceFromValue),
                    ...mapDataWithKey(filteredData)
                ]
            } else if (priceTo && priceFrom) {
                return [
                    generatePriceItem(priceTo, priceToValue),
                    generatePriceItem(priceFrom, priceFromValue),
                    ...mapDataWithKey(filteredData)
                ]
            } else {
                return mapDataWithKey(filteredData)
            }
        } catch (error) {
            errorHandler("FilterBottomPanel", "func - filteringAllData", error)
        }
    }, [filterAllData, queryFilterData])

    useEffect(() => {
        if (queryFilterData.length > 0) {
            timerAnimateTriggerRef.current = setTimeout(() => {
                setFilterTabAnimateTrigger(true)
            }, 400)
        } else {
            setFilterTabAnimateTrigger(false)
        }

        return () => {
            clearTimeout(timerAnimateTriggerRef.current)
        }
    }, [queryFilterData]);

    return (
        <div className={styles['filter_panel']}>
            {
                !mediaQuerySm &&
                <ul className={styles['filter_list_actions']}>
                    {
                        Object.values(filteringAllData || {}).map((filter, id) => {
                            return (
                                <Animation
                                    key={filter?.["id"]}
                                    tag={'li'}
                                    style={{
                                        transitionDelay: id * 0.104 + 's'
                                    }}
                                    triggerAnimate={filterTabAnimateTrigger}
                                    onClick={async () => {
                                        const filterKey = filter?.["key"];
                                        const filterValue = filter?.["attributes"]?.["type"];
                                        const filterValueNameType = filter?.["attributes"]?.["name"]

                                        filterClearHandle({
                                            key: filterKey,
                                            value: filterValue
                                        })
                                        filterApiClearHandle({
                                            key: filterGetCurrentKey(filterKey),
                                            value: filterValue
                                        })

                                        sendFilterQuery({
                                            key: filterKey,
                                            value: filterValue || filterValueNameType
                                        }, true)
                                    }}
                                >
                                    <span>{filter?.["attributes"]?.["name"]}</span> <i className={styles['icon']}></i>
                                </Animation>
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
                                    lineHeight: "18.2px",
                                    height: '33px'
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
                        animateActive={catalogContent === 'list'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px",
                            height: '33px'
                        }}
                    >
                        <i className={`${styles['icon']} ${catalogContent === "list" ? styles['invert_icon'] : ''} ${styles['icon_list']}`}/>
                    </Button>

                    <Button
                        type={'primary_animate'}
                        onClick={switchBtnOnClick}
                        animateActive={catalogContent === 'map'}
                        style={{
                            fontSize: "13px",
                            lineHeight: "18.2px",
                            height: '33px'
                        }}
                    >
                        <i className={`${styles['icon']} ${catalogContent === "map" ? styles['invert_icon'] : ''} ${styles['icon_marker']}`}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FilterBottomPanel;
