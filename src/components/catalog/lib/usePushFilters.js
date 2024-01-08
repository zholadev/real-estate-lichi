import qs from "qs";
import {useRouter, useSearchParams} from "next/navigation";
import {useToastMessage} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @returns {(function(*, *, *): void)|*}
 */
function usePushFilters() {
    const RESIDENCE_FILTER = "residence";
    const PRICE_FROM_FILTER = "price.from";
    const PRICE_TO_FILTER = "price.to";
    const PAGE_FILTER = 'page'

    const router = useRouter();
    const params = useSearchParams()

    const isPageParams = params.get("page")

    const residenceFilter = (value) => ({name: {$contains: value}});
    const priceFromFilter = (value) => ({price: {$gte: value}});
    const priceToFilter = (value) => ({price: {$lte: value}});
    const pageFilter = (value) => ({page: value})
    const defaultFilter = (value) => ({type: value});

    const transformFilter = (key, value) => {
        switch (key) {
            case RESIDENCE_FILTER:
                return {[key]: residenceFilter(value)};

            case PRICE_FROM_FILTER:
                return priceFromFilter(value);

            case PRICE_TO_FILTER:
                return priceToFilter(value);

            case PAGE_FILTER:
                return pageFilter(value)

            default:
                return {[key]: defaultFilter(value)};
        }
    };

    const buildFilters = (filters) => {
        return Object.entries(filters || {}).map(([key, value]) => {
            if (value === null) return
            return transformFilter(key, value);
        });
    };

    return (url, filters) => {
        if (Object.values(filters || {}).length === 0) {
            return
        }

        let paramsObject = {
            filters: buildFilters(filters),
        }

        if (isPageParams) {
            paramsObject["page"] = isPageParams
        }

        const queryString = qs.stringify(
            paramsObject,
            {arrayFormat: "repeat"}
        );

        router.push(`${url}?${queryString}`);
    };
}

export default usePushFilters;
