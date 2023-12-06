function useSetFilter() {
    return (prevFilters, key, value, multiple) => {
        try {
            if (prevFilters.hasOwnProperty(key) && multiple) {
                return {
                    ...prevFilters,
                    [key]: Array.isArray(prevFilters[key])
                        ? [...prevFilters[key], value]
                        : [prevFilters[key], value],
                };
            } else {
                return {
                    ...prevFilters,
                    [key]: value,
                };
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default useSetFilter;
