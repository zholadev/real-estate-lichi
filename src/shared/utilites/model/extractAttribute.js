/**
 * @author Zholaman Zhumanov
 * @created 05.01.2024
 * @param attributePath
 * @param data
 * @returns {undefined|*}
 */
export const extractAttribute = (attributePath, data) => {
    if (data) {
        const paths = attributePath.split('.');
        let attribute = data["attributes"];
        for (const path of paths) {
            attribute = attribute ? attribute[path] : undefined;
        }
        return attribute;
    } else {
        return undefined;
    }
}
