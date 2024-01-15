import {useCallback} from "react";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 15.12.2023
 * @returns {Element}
 * @constructor
 */
function useFilterConvertQuery() {
    return useCallback((data) => {
        try {
            return Object.entries(data || {}).reduce((result, [key, value]) => {
                const matches = key.match(/filters\[(.*?)\]\[type\]/);

                // Check for the special case key
                const specialResidenceKey = 'filters[residence][name][$contains]';
                const specialPriceFromKey = 'filters[price][$gte]'
                const specialPriceToKey = 'filters[price][$lte]'

                if (matches && matches[1]) {
                    result[matches[1]] = value;
                } else if (key === specialResidenceKey) {
                    // If the key is the special key, add it as it is to the resulting object
                    result['residence'] = value;
                } else if (key === specialPriceFromKey) {
                    // If the key is the special key, add it as it is to the resulting object
                    result['price.from'] = value;
                } else if (key === specialPriceToKey) {
                    // If the key is the special key, add it as it is to the resulting object
                    result['price.to'] = value;
                }

                return result;
            }, {});
        } catch (error) {
            errorHandler("useFilterConvertQuery", "func", error)
        }
    }, [])
}

export default useFilterConvertQuery;
