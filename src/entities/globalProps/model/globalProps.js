import {globalGetTranslate} from "@/entities/i18n";

export const globalProps = async (context) => {
    return {
        i18n: await globalGetTranslate(context.locale) || [],
    }
}
