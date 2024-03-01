import {getDictionary} from "@/dictionaries";

export const globalGetTranslate = async (locale = "en", file) => {
    return await getDictionary(locale, file)
}
