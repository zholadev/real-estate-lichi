

import {useState} from 'react';
// import {errorHandler} from "@/shared/plugins/sentry";
import {useToastMessage} from "@/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @name useApiRequest
 * @created 24.08.2023
 * @returns {{apiFetchHandler: ((function(*, []=, *, *): Promise<void>)|*), loading: boolean}}
 */
function useApiRequest() {
    const [loading, setLoading] = useState(false)

    const toastMessage = useToastMessage()

    const apiFetchHandler = async (apiFetchFunc, params = [], loader, options) => {
        try {
            setLoading(true)

            if (loader) {
                loader(true)
            }

            await apiFetchFunc(...params)
                .then(res => {
                    const data = res
                    const api_data = res?.["data"]
                    const messages = res?.["data"]?.["api_messages"]
                    const exceptions = res?.["data"]?.["api_exception"]
                    const success = res?.["data"]?.["api_data_success"]
                    const errorFields = res?.["data"]?.["api_data"]?.["error_fields"]

                    if (!options?.onDisabledMessage) {
                        if (messages) {
                            messages.map((item) => (
                                toastMessage(item?.["text"])
                            ))
                        }

                        if (exceptions) {
                            exceptions.map((item) => (
                                toastMessage(item?.["message"])
                            ))
                        }
                    }

                    if (options?.onGetData) {
                        options.onGetData({api_data, errorFields, success, messages, data});
                    }

                    if (success) {
                        if (options.onSuccessCallbackFunc) {
                            options.onSuccessCallbackFunc()
                        }
                    }
                }).catch(error => {
                    console.log(`page: useApiRequest, event: ${options.name ?? "apiFetchFunc"}, error: ${error}`)
                })

            setLoading(false)

            if (!options.disableLoading) {
                if (loader) {
                    loader(false)
                }
            }
        } catch (error) {
            console.log(`page: useApiRequest, event: useApiRequest, error: ${error}`)
        }
    }

    return {apiFetchHandler, loading}
}

export default useApiRequest;
