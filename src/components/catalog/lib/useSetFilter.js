function useSetFilter() {
    return (prevFilters, key, value) => {
        try {
            if (value === null) {
                const {[key]: deletedValue, ...rest} = prevFilters;
                return rest;
            } else {
                // Если ключа нет или значение не является массивом, устанавливаем новое значение
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
