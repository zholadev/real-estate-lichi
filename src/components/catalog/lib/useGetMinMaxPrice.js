import {useMemo} from 'react';
import {useAppSelector} from "@/entities/store/hooks/hooks";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 27.03.2024
 * @return {{min: number, max: number}|{min: number, max: number}}
 */
function useGetMinMaxPrice() {
    const {
        filterCtgObjectData,
    } = useAppSelector(state => state?.filterCatalog)

    /**
     * @author Zholaman Zhumanov
     * @description Получение минимальной и максимальной цены для апартаментов
     * @type {{min: number, max: number}|{min: number, max: number}}
     */
    return useMemo(() => {
        try {
            const prices = Object.values(filterCtgObjectData || {}).map((item) => item?.["attributes"]?.["price"])

            if (prices.length === 0) {
                return {
                    "min": 0,
                    "max": 0
                }
            }

            return {
                "min": Math.min(...prices),
                "max": Math.max(...prices)
            }
        } catch (error) {
            errorHandler("filter", "getMinMaxPrices", error)
        }
    }, [filterCtgObjectData])

}

export default useGetMinMaxPrice;
