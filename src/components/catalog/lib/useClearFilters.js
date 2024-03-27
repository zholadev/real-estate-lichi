import {useCallback, useMemo, useRef} from 'react';
import {useRouter} from "next/navigation";
import {useDispatchHandler} from "@/shared/hooks";
import {routerPage} from "@/entities/router/model/pages";
import {useAppSelector} from "@/entities/store/hooks/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 27.03.2024
 * @return {Element}
 * @constructor
 */
function useClearFilters() {
    const app = useDispatchHandler()

    const timerClearValue = useRef(null)

    const router = useRouter()

    const {
        catalogType
    } = useAppSelector(state => state?.catalog)

    /**
     * @author Zholaman Zhumanov
     * @description Базовые параметры для запроса
     * @type {{"filters[apartments][name][$notNull]": boolean, "filters[apartments][residence][name][$notNull]": boolean}|{"filters[apartments][name][$notNull]": boolean}}
     */
    const residenceApiParams = useMemo(() => {
        return catalogType === 'residential_complex' ? {
            "filters[apartments][name][$notNull]": true,
            "filters[apartments][residence][name][$notNull]": true
        } : {"filters[apartments][name][$notNull]": true}
    }, [catalogType])

    /**
     * @author Zholaman Zhumanov
     * @description Очистка фильтра
     * @type {(function(): void)|*}
     */
    const clearFilters =  useCallback(() => {
        try {
            if (timerClearValue.current) {
                clearTimeout(timerClearValue.current)
            }
            app.filterCtgQueriesDataClearAction({})
            app.filterCtgObjectQueriesClearAction({})
            app.filterCtgPriceFromAction(null)
            app.filterCtgPriceValueAction(null)
            app.filterCtgClearAction('clear')
            router.push(routerPage.catalog)
            app.filterCtgQueriesDataFillAction(residenceApiParams)

            timerClearValue.current = setTimeout(() => {
                app.filterCtgClearAction('fill')
            }, 500)
        } catch (error) {
            errorHandler("filters", "clearFilters", error)
        }
    }, [timerClearValue, router, residenceApiParams])

    return {
        clearFilters,
        residenceApiParams
    }
}

export default useClearFilters;
