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
function MainConsultation(props) {
    const {i18n} = props

    return (
        <div className={styles['main_consultation']}>
            <h3>{i18n?.["form"]?.["consultant_description"]}</h3>

            <form className={styles['request_form']}>
                <div className={styles['form_single']}>
                    <FormSelect
                        i18n={i18n}
                        type={'secondary'}
                        label={'Услуга'}
                    />
                </div>
                <div className={styles['form_single']}>
                    <Input
                        label={'Имя'}
                    />
                </div>
                <div className={styles['form_double']}>
                    <Input
                        label={'E-mail'}
                    />
                    <Input
                        label={'Телефон'}
                    />
                </div>

                <div className={styles['form_single']}>
                    <FormTextArea
                        id={'comments'}
                        name={'comments'}
                        label={'Комментарий'}
                    />
                </div>

                <Button
                    type={'outline'}
                    title={'Отправить'}
                    style={{
                        minWidth: "295px"
                    }}
                />
            </form>
        </div>
    );
}

export default MainConsultation;
