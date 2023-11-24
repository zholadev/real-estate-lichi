import React from 'react';
import styles from '@/styles/customer_content.module.sass'
import {PrimaryCard} from "@/shared/uikit/cards/primaryCard";
import {ButtonArrow} from "@/shared/uikit/button";

// TODO: style file update

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function CustomerObjectContent(props) {
    const {i18n, title, col = 3, container = 'container_sm_pn', button, buttonTitle, data, redirectTo} = props

    return (
        <div className={'container_md_pn'}>
            <div className={styles['object_content']}>
                <h3 className={styles['title']}>{title}</h3>

                <div className={container}>
                    <div className={styles[`content_list_${col}`]}>
                        {
                            Object.values(data || {}).map((item, id) => {
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
