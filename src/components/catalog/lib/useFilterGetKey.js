import {errorHandler} from "@/entities/errorHandler/errorHandler";

function useFilterGetKey() {
    return (filterType) => {
        try {
            let key = `filters[apartments][${filterType}][type]`

            if (filterType === 'residence') {
                key = `filters[apartments][residence][name][$contains]`
            }

            return key
        } catch (error) {
            errorHandler("useFilterConvertToApiData", "func", error)
        }
    }
}

export default useFilterGetKey;
