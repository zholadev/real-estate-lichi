import React from 'react';
import styles from '@/styles/main.module.sass'
import {FormSelect} from "@/shared/uikit/form/select";
import {Button} from "@/shared/uikit/button";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023 - Zholaman Zhumanov
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainFormInvesting(props) {
    const {i18n} = props

    return (
        <div className={styles['main_form_investing']}>
            <div className={styles['title']}>{i18n?.["main"]?.["form_investing_title"]}</div>
            <div className={styles['subtitle']}>{i18n?.["main"]?.["form_investing_subtitle"]}</div>

            <form className={`${styles['form_investing']} container_sm_pn`}>
                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["form"]?.["selected"]}
                        i18n={i18n}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["form"]?.["selected"]}
                        i18n={i18n}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["form"]?.["selected"]}
                        i18n={i18n}
                    />
                </div>

                <div className={styles['form_box']}>
                    <FormSelect
                        placeholder={i18n?.["form"]?.["selected"]}
                        i18n={i18n}
                    />
                </div>

            </form>

            <Button
                title={i18n?.["site"]?.["search_title"]}
                style={{minWidth: "303px"}}
            />
        </div>
    );
}

export default MainFormInvesting;
