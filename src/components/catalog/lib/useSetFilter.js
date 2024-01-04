function useSetFilter() {
    return (prevFilters, key, value, name, multiple) => {
        try {
            if (value === null) {
                const { [key]: deletedValue, ...rest } = prevFilters;
                return rest;
            } else if (prevFilters.hasOwnProperty(key) && Array.isArray(prevFilters[key]) && multiple) {
                // Если ключ существует и его значение - массив, проверяем новое значение
                if (value !== null) {
                    // Если новое значение не null, добавляем его в массив
                    return {
                        ...prevFilters,
                        [key]: [...prevFilters[key], value],
                    };
                } else {
                    // Если новое значение null, фильтруем массив, удаляя все null значения
                    const updatedArray = prevFilters[key].filter((item) => item !== null);
                    // Если после удаления массив не пуст, обновляем объект
                    return updatedArray.length > 0
                        ? {
                            ...prevFilters,
                            [key]: updatedArray,
                        }
                        : {
                            ...prevFilters,
                            // Если массив стал пустым, удаляем ключ из объекта
                            [key]: undefined,
                        };
                }
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
