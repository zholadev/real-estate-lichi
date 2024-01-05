import qs from "qs";
import {useRouter} from "next/navigation";
import {useToastMessage} from "@/shared/hooks";

function usePushFilters() {
    const router = useRouter()

    const toastMessage = useToastMessage()

    const transformFilter = (key, value) => {
        switch (key) {
            case "residence":
                return {
                    [key]: {
                        name: {
                            $contains: value,
                        },
                    },
                };
            case "price.from":
                return {
                    price: {
                        $gte: value,
                    },
                };
            case "price.to":
                return {
                    price: {
                        $lte: value,
                    },
                };
            default:
                return {
                    [key]: {
                        type: value,
                    },
                };
        }
    };

    const transformResidenceFilter = (key, value) => {
        switch (key) {
            case "price.from":
                return {
                    'apartments': {
                        price: {
                            $gte: value,
                        },
                    }
                };
            case "price.to":
                return {
                    'apartments': {
                        price: {
                            $lte: value,
                        },
                    }
                };
            default:
                return {
                    'apartments': {
                        [key]: {
                            type: value,
                        },
                    },
                };
        }
    };

    const buildFilters = (filters, residenceFilter) => {
        return Object.entries(filters || {}).map(([key, value]) => {
            return transformFilter(key, value);
        });
    };

    return (url, filters, residenceFilter) => {
        if (Object.values(filters || {}).length === 0) {
            toastMessage("Please select filter value", "error")
            return
        }

        const queryString = qs.stringify(
            {
                filters: buildFilters(filters, residenceFilter),
            },
            {arrayFormat: "repeat"}
        );

        router.push(`${url}?${queryString}`);
    };
}

export default usePushFilters;
