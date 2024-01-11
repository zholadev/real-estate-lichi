/**
 * @author Zholaman Zhumanov
 * @created 05.01.2024
 * @param attributePath
 * @param data
 * @param cleanPath
 * @returns {undefined|*}
 */
export const extractAttribute = (attributePath, data, cleanPath = false) => {
    if (data) {
        const paths = attributePath.split('.');

        let attribute = data;

        if (cleanPath) {
             attribute = data
        } else {
             attribute = data['attributes']
        }

        for (const path of paths) {
            attribute = attribute ? attribute?.[path] : undefined;
        }
        return attribute;
    } else {
        return undefined;
    }
}
