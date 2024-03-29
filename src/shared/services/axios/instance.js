import axios from "axios";
import Cookies from "js-cookie";
import {apiErrorHandler} from "./lib/apiErrorHandler";
import {cookiesName} from "@/shared/constants/options";

/**
 * @author Zholaman Zhumanov
 * @description axios instance settings
 * @type {AxiosInstance}
 */
const AxiosInstance = axios.create({
    baseURL: 'https://meta-trust-api.spb.lichishop.com/api/',
    withCredentials: true,
    data: {
        populate: "*"
    },
});

export const api_client_get = async (method, params = {}) => {
    try {
        let api_data = false;

        let response = await AxiosInstance.get(`${method}`, {
            params: {
                populate: "*",
                locale: Cookies.get(cookiesName.lang) || "en",
                ...params,
            }
        })

        if (response) {
            api_data = response?.["data"]
        } else {
            new Error('Error Getting Data.');
        }

        return api_data
    } catch (error) {
        return apiErrorHandler(error, method, params)
    }
}
