'use client'

/**
 * @author Zholaman Zhumanov
 * @name useCurrencyFormat
 * @description get number and convert to currency format
 * @returns {(function(*): (undefined|*))|*}
 */
function useCurrencyFormat() {

    return (value, postfix) => {
        try {
            if (!value) return;

            return `$ ${Intl.NumberFormat('en-US').format(value).split(',').join(' ') ?? value}`
        } catch (error) {
            console.log(`page: useCurrencyFormat, event: useCurrencyFormat, error: ${error}`)
        }
    }
}

export default useCurrencyFormat;
