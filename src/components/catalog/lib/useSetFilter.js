import {errorHandler} from "@/entities/errorHandler/errorHandler";

function useSetFilter() {
    return (prevFilters, key, value, isMultiple) => {
        try {
            if (!value) {
                const {[key]: deletedValue, ...rest} = prevFilters;
                return rest;
            } else if (prevFilters.hasOwnProperty(key) && isMultiple) {
                return {
                    ...prevFilters,
                    [key]: Array.isArray(prevFilters[key])
                        ? prevFilters[key].includes(value)
                            ? prevFilters[key].filter(v => v !== value) // удаляем значение из массива, если оно уже присутствует
                            : [...prevFilters[key], value].filter(v => v !== null) // иначе добавляем его
                        : value !== null && value !== prevFilters[key]
                            ? [prevFilters[key], value] // если новое значение не равно старому, добавляем его в массив
                            : [] , // если новое значение равно старому, возвращаем пустой массив
                };
            } else {
                // Если ключа нет или значение не является массивом, устанавливаем новое значение
                return {
                    ...prevFilters,
                    [key]: value,
                };
            }
        } catch (error) {
            errorHandler("useSetFilter", "func", error)
        }
    }
}

export default useSetFilter;
