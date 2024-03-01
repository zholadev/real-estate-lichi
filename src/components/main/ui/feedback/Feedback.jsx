

import React from 'react';
import styles from '@/styles/main.module.sass'
import {Input} from "@/shared/uikit/form/input";
import {FormTextArea} from "@/shared/uikit/form/textarea";
import {Button} from "@/shared/uikit/button";
import {FormSelect} from "@/shared/uikit/form/select";

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function Feedback(props) {
    const {i18n} = props

    return (
        <div className={styles['main_consultation']}>
            <h3>{i18n?.["form"]?.["consultant_description"]}</h3>

            <form className={styles['request_form']}>
                <div className={styles['form_single']}>
                    <FormSelect
                        i18n={i18n}
                        type={'secondary'}
                        label={i18n?.["form.service.title"]}
                    />
                </div>
                <div className={styles['form_single']}>
                    <Input
                        label={i18n?.["form.name.title"]}
                    />
                </div>
                <div className={styles['form_double']}>
                    <Input
                        label={i18n?.["form.email.title"]}
                    />
                    <Input
                        label={i18n?.["form.phone.title"]}
                    />
                </div>

                <div className={styles['form_single']}>
                    <FormTextArea
                        id={'comments'}
                        name={'comments'}
                        label={i18n?.["form.comment.title"]}
                    />
                </div>

                <Button
                    type={'outline'}
                    title={i18n?.["form.send.title"]}
                    style={{
                        minWidth: "295px"
                    }}
                />
            </form>
        </div>
    );
}

export default Feedback;
