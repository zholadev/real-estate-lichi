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
            case "price":
                return {
                    price: {
                        $gte: value,
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

    const buildFilters = (filters) => {
        return Object.entries(filters || {}).map(([key, value]) => {
            return transformFilter(key, value);
        });
    };

    return (url, filters) => {
        if (Object.values(filters || {}).length === 0) {
            toastMessage("Please select filter value", "error")
            return
        }

        const queryString = qs.stringify(
            {
                filters: buildFilters(filters),
            },
            {arrayFormat: "repeat"}
        );

        router.push(`${url}?${queryString}`);
    };
}

export default usePushFilters;
