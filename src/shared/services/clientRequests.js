import {api} from "./api/api";
import {api_client_get} from "./axios/instance";

/**
 * @author Zholaman Zhumanov
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetCategoryData = async () => {
    return await api_client_get(api.category.get, {})
}

/**
 * @author Zholaman Zhumanov
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetNewsData = async (limit, page, params) => {
    return await api_client_get(api.news.get, {'pagination[pageSize]': limit, 'pagination[page]': page, ...params})
}

/**
 * @author Zholaman Zhumanov
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetNewsByIdData = async (id, params) => {
    return await api_client_get(`${api.news.get}/${id}`, {
        "populate": "more_interestings.images,images,tags,*",
        ...params
    })
}

/**
 * @author Zholaman Zhumanov
 * @description method for get residence list data
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetResidentialData = async (page, params) => {
    const updatedParams = Object.fromEntries(
        Object.entries(params || {}).filter(([key]) => key !== 'page')
    );

    return await api_client_get(api.residential_complexes.get, {
        "pagination[page]": page,
        "populate": "photo_preview.item,,tags,locate,locate.photo,*",
        ...updatedParams
    })
}

/**
 * @author Zholaman Zhumanov
 * @description method for get residence data by id
 * @param id
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetResidentialByIdData = async (id) => {
    return await api_client_get(`${api.residential_complexes.get}/${id}`,
        {
            "populate": "residence,room,district,property_type,tags,apartments.photo_preview.item,locations.photos,interior_description,interior_description.images,videos.item,videos.item,photos.item,video_posters.item,attractions.photo,locate,attractions,*"
        }
    )
}

/**
 * @author Zholaman Zhumanov
 * @description method for get apartment list
 * @param page
 * @param params
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetApartmentsData = async (page, params) => {
    const updatedParams = Object.fromEntries(
        Object.entries(params || {}).filter(([key]) => key !== 'page')
    );

    return await api_client_get(
        api.apartment.get,
        {
            "pagination[page]": page,
            "populate": "photo_preview.item,tags,locate.photo,*",
            ...updatedParams
        })
}

/**
 * @author Zholaman Zhumanov
 * @description method for get apartment by id
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 * @param id
 * @param locale
 */
export const apiGetApartmentsByIdData = async (id, locale) => {
    return await api_client_get(
        `${api.apartment.get}/${id}`,
        {
            "id": id,
            "populate": "attractions,managers,managers.info,managers.contacts,managers.photo.item,photos.item,residence,room,district,property_type,tags,layouts.locates,layouts.images,build_info,payment_plan,locate,locate.photo,attractions.photo,country,*",
            "locale": locale
        })
}


/**
 * @author Zholaman Zhumanov
 * @description method for get residence list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterResidenceList = async () => {
    return await api_client_get(api.filter.residence_get,
        {
            populate: false,
            "fields[0]": "name",
            "pagination[limit]": -1
        })
}

/**
 * @author Zholaman Zhumanov
 * @description method for get district list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterDistrictList = async () => {
    return await api_client_get(api.filter.district_get, {"pagination[limit]": -1})
}

/**
 * @author Zholaman Zhumanov
 * @description method for get rooms list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterRoomsList = async () => {
    return await api_client_get(api.filter.rooms_get, {"pagination[limit]": -1})
}

/**
 * @author Zholaman Zhumanov
 * @description method for get property type list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterPropertyTypeList = async () => {
    return await api_client_get(api.filter.property_types_get, {"pagination[limit]": -1})
}

/**
 * @author Zholaman Zhumanov
 * @description method for get property type list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterTagsList = async () => {
    return await api_client_get(api.filter.tag_get, {"pagination[limit]": -1})
}


/**
 * @author Zholaman Zhumanov
 * @description method for get prices list
 * @returns {Promise<boolean|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetFilterPriceList = async () => {
    return await api_client_get(api.filter.prices_get, {"pagination[limit]": -1})
}
