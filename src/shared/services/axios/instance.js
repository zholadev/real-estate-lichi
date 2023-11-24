import axios from "axios";
import {apiErrorHandler} from "./lib/apiErrorHandler";
import Cookies from "js-cookie";

/**
 * @author Zholaman Zhumanov
 * @description axios instance settings
 * @type {AxiosInstance}
 */
const AxiosInstance = axios.create({
    baseURL: 'https://meta-trust-api.spb.lichishop.com/api/',
    // baseURL: 'http://localhost:4042/api/',
    withCredentials: true,
    data: {
        populate: "*"
    },
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});


export const api_client_call = async (method, params = {}, postMethod = 'post') => {
    try {
        let api_data = false;

        let apiDataConfig = {
            populate: "*",
            ...params
        }

        let response = await AxiosInstance[postMethod](`${method}`, apiDataConfig, {
            params: {
                populate: "*",
                ...params
            }
        })

        if (response) {
            api_data = response
        } else {
            new Error('Error Getting Data.');
        }

        return api_data
    } catch (error) {
        return apiErrorHandler(error, method, params)
    }
}


export const api_client_get = async (method, params = {}) => {
    try {
        let api_data = false;

        let response = await AxiosInstance.get(`${method}`, {
            params: {
                populate: "*",
                locale: Cookies.get('dubai_lang') || "en",
                ...params,
            }
        })

        if (response) {
            api_data = response
        } else {
            new Error('Error Getting Data.');
        }

        return api_data
    } catch (error) {
        return apiErrorHandler(error, method, params)
    }
}
