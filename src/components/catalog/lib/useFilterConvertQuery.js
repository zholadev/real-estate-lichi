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
                if (matches && matches[1]) {
                    result[matches[1]] = value;
                }
               
                return result;
            }, {});
        } catch (error) {
            errorHandler("useFilterConvertQuery", "func", error)
        }
    }, [])
}

export default useFilterConvertQuery;
