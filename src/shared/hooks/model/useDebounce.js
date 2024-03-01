
import {useCallback, useRef} from 'react';

/**
 * @author Zholaman Zhumanov
 * @name useDebounce
 * @returns {(function(): void)|*}
 */
function useDebounce() {
    const timer = useRef();

    return (callback, delay, params) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(params);
        }, delay);
    }
}

export default useDebounce;
