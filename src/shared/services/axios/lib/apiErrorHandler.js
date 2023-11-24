export const apiErrorHandler = (error, method, params) => {
    if (error.response) {
        const status = error.response.status;
        if (status === 404) {
            console.error('Page not found: ', error.message);
            console.error('method', method)
            console.error('params', params)
        } else if (status === 403) {
            console.error('Access is denied: ', error.message);
            console.error('method', method)
            console.error('params', params)
        } else {
            console.error('Page not found: ', error.message);
            console.error('method', method)
            console.error('params', params)
        }

        return {
            success: false,
            data: error.response?.data,
            message_fail: 'An error occurred, please try again'
        };
    } else {
        console.error('error: ', error.message);
        console.error('method', method)
        console.error('params', params)
        return {
            success: false,
            error: error.message,
            data: error.response?.data,
            message_fail: 'An error occurred, please try again'
        };
    }
}
