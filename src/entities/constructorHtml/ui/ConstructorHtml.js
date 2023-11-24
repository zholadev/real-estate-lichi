'use client'

import React from 'react';

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {unknown[] | undefined}
 * @constructor
 */
function ConstructorHtml(props) {
    const {jsonHtmlData} = props

    const getJsonTagHandler = (type) => {
        switch (type) {
            case 'paragraph':
                return {
                    'type': 'p',
                    "single": false
                }
            case 'linebreak':
                return {
                    'type': 'br',
                    "single": true
                }
            case 'link':
                return {
                    'type': 'a',
                    "single": false
                }
            case 'h1':
                return {
                    'type': 'h1',
                    "single": false
                }
            case 'h2':
                return {
                    'type': 'h2',
                    "single": false
                }
            case 'h3':
                return {
                    'type': 'h3',
                    "single": false
                }
            case 'h4':
                return {
                    'type': 'h4',
                    "single": false
                }
            case 'h5':
                return {
                    'type': 'h5',
                    "single": false
                }
            case 'h6':
                return {
                    'type': 'h6',
                    "single": false
                }
            case 'text':
                return {
                    'type': 'span',
                    "single": false
                }
            case 'image':
                return {
                    'type': 'img',
                    "single": true
                }
            default:
                return {
                    'type': 'div',
                    "single": false
                }
        }
    }

    const headingTextGetLevelType = (level) => {
        try {
            if (!level) return false;
            const levels = {
                1: {"tag": "h1"},
                2: {"tag": "h2"},
                3: {"tag": "h3"},
                4: {"tag": "h4"},
                5: {"tag": "h5"},
                6: {"tag": "h6"}
            }

            return levels[level]
        } catch (error) {
            console.log(`page: constructorHtml, event: headingTextGetLevelType, error: ${error}`)
        }
    }

    const getTagStyles = (obj) => {
        let jsonTagHocStyle = {};

        obj?.forEach(item => {
            const styleName = item?.["style"];
            const typeStyleValue = item?.["value"]?.["value"]?.[0] ? item?.["value"]?.["value"]?.[0] : item?.["value"]
            jsonTagHocStyle[styleName] = item?.["value"]?.["unit"] ? typeStyleValue + item?.["value"]?.["unit"] : typeStyleValue;
        });

        return jsonTagHocStyle
    }

    return (
        Object?.values(jsonHtmlData || {})?.map((jsonHocItem, jsonHocId) => {
            const getJsonTag = getJsonTagHandler(jsonHocItem?.["type"])

            const jsonGetSetTag = {
                tag: headingTextGetLevelType(jsonHocItem?.["level"])?.["tag"] || jsonHocItem?.['tag'] || getJsonTag?.["type"],
                single: getJsonTag?.["single"]
            }

            return (
                jsonGetSetTag?.single ?
                    <jsonGetSetTag.tag
                        key={jsonHocId}
                        dir={jsonHocItem?.['direction']}
                        style={{
                            ...getTagStyles(jsonHocItem?.["style"])
                        }}
                        rel={jsonHocItem?.["rel"]}
                        href={jsonHocItem?.["url"]}
                        target={jsonHocItem?.["target"]}
                        src={jsonHocItem?.["src"]}
                    />
                    :
                    jsonHocItem?.["type"] === "list-item" ?
                        <ul
                            style={{
                                listStyle: "inside"
                            }}
                        >
                            {
                                Object.values(jsonHocItem?.["children"] || {}).map((listItem, listId) => {
                                    return (
                                        <li style={{marginBottom: "10px"}} key={listId}>{listItem?.["text"]}</li>
                                    )
                                })
                            }
                        </ul>
                    :
                    <jsonGetSetTag.tag
                        key={jsonHocId}
                        dir={jsonHocItem?.['direction']}
                        style={{
                            ...getTagStyles(jsonHocItem?.["style"])
                        }}
                        href={jsonHocItem?.["url"]}
                        target={jsonHocItem?.["target"]}
                        src={jsonHocItem?.["src"]}
                    >
                        {jsonHocItem?.["text"]}
                        {jsonHocItem?.["children"] && jsonHocItem?.["children"]?.length > 0 &&
                            <ConstructorHtml jsonHtmlData={jsonHocItem?.["children"]}/>}
                    </jsonGetSetTag.tag>
            )
        })
    );
}

export default React.memo(ConstructorHtml);
