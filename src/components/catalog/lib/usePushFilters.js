import qs from "qs";
import {useRouter} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @returns {(function(*, *, *): void)|*}
 */
function usePushFilters() {
    const RESIDENCE_FILTER = "residence";
    const PRICE_FROM_FILTER = "price.from";
    const PRICE_TO_FILTER = "price.to";

    const router = useRouter();

    const residenceFilter = (value) => ({name: {$contains: value}});
    const priceFromFilter = (value) => ({price: {$gte: value}});
    const priceToFilter = (value) => ({price: {$lte: value}});
    const defaultFilter = (value) => ({type: value});

    const transformFilter = (key, value) => {
        switch (key) {
            case RESIDENCE_FILTER:
                return {[key]: residenceFilter(value)};

            case PRICE_FROM_FILTER:
                return priceFromFilter(value);

            case PRICE_TO_FILTER:
                return priceToFilter(value);

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

    return async (url, filters) => {
        if (Object.values(filters || {}).length === 0) {
            return
        }

        let paramsObject = {
            filters: buildFilters(filters),
        }

        const queryString = qs.stringify(
            paramsObject,
            {arrayFormat: "repeat"}
        );

        await router.push(`${url}?${queryString}`);
    };
}

export default usePushFilters;
