

import React from 'react';
import {ButtonArrow} from "@/shared/uikit/button";
import styles from '@/styles/customer_content.module.sass'
import {PrimaryCard} from "@/shared/uikit/cards/primaryCard";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @todo refactoring and styles update
 * @param props
 * @returns {Element}
 * @constructor
 */
function CustomerObjectContent(props) {
    const {i18n, title, col = 3, container = 'container_sm_pn', button, buttonTitle, data = [], redirectTo} = props

    if (!data || data.length === 0) {
        return null
    }

    return (
        <div className={'container_md_pn'}>
            <div className={styles['object_content']}>
                <h3 className={styles['title']}>{title}</h3>

                <div className={container}>
                    <div className={styles[`content_list_${col}`]}>
                        {
                            data.map((item, id) => {
                                return (
                                    <PrimaryCard key={id} cardData={item}/>
                                )
                            })
                        }
                    </div>

                    {
                        button &&
                        <div className={styles['more_btn_place']}>
                            <ButtonArrow
                                title={buttonTitle}
                                url={redirectTo || '/catalog'}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomerObjectContent;
