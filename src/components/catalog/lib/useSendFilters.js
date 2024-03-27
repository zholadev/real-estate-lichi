import {useDispatchHandler, useMediaMaxState, useToastMessage} from "@/shared/hooks";
import useSetFilter from "./useSetFilter";
import usePushFilters from "./usePushFilters";
import useGetMinMaxPrice from "./useGetMinMaxPrice";
import {routerPage} from "@/entities/router/model/pages";
import {useAppSelector} from "@/entities/store/hooks/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 27.03.2024
 * @return {Element}
 */
function useSendFilters() {
    const app = useDispatchHandler()

    const toastMessage = useToastMessage()
    const pushFilterHandle = usePushFilters()
    const getSetFilterHandle = useSetFilter()

    const getMinMaxPrices = useGetMinMaxPrice()

    const mediaQuerySm = useMediaMaxState({screenSize: 576})

    const {
        filterCtgSidebar,
        filterCtgQueriesData,
    } = useAppSelector(state => state?.filterCatalog)

    /**
     * @author Zholaman Zhumanov
     * @description Переключение мобильной версий
     * @return {*}
     */
    const toggleFilterSidebarHandle = () => app.filterCtgSidebarAction(!filterCtgSidebar);

    /**
     * @author Zholaman Zhumanov
     * @description Отправка фильтрлв
     * @param filterData
     * @param filterToggle
     * @return {Promise<void>}
     */
    return (filterData, filterToggle) => {
        const parsePrice = (key) => parseFloat(filterCtgQueriesData?.[`price.${key}`]);

        const invalidPriceMsg = "You entered incorrect price values";
        const lowerThanMinPriceMsg = "The total should not be lower than the minimum price";
        const exceedsMaxPriceMsg = "The total should not exceed the maximum price";

        const fromPrice = parsePrice('from');
        const toPrice = parsePrice('to');
        const minPrice = getMinMaxPrices?.["min"];
        const maxPrice = getMinMaxPrices?.["max"];

        if (fromPrice > toPrice) {
            toastMessage(`${invalidPriceMsg}, ${minPrice}`)
            return;
        }

        if (fromPrice < minPrice || toPrice < minPrice) {
            toastMessage(`${lowerThanMinPriceMsg}, ${minPrice}`)
            return;
        }

        if (toPrice > maxPrice) {
            toastMessage(`${exceedsMaxPriceMsg}, ${maxPrice}`)
            return;
        }


        if (filterData) {
            const newObjectFilter = {filterCtgQueriesData}

            const getFilterData = Object.values(newObjectFilter || {}).map((filterItem) => {
                return getSetFilterHandle(filterItem, filterData.key, filterData.value, true)
            })

            pushFilterHandle(routerPage.catalog, getFilterData?.[0]);
        } else {
            pushFilterHandle(routerPage.catalog, filterCtgQueriesData);
        }

        if (mediaQuerySm && !filterToggle) {
            toggleFilterSidebarHandle()
        }
    };
}

export default useSendFilters;
