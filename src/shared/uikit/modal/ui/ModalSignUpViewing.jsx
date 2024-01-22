import React from 'react';
import {useSelector} from "react-redux";
import {Button} from "@/shared/uikit/button";
import {useMediaMaxState} from "@/shared/hooks";
import {Input} from "@/shared/uikit/form/input";
import styles from "@/styles/object-page.module.sass";
import ModalContainer from "./container/ModalContainer";
import DetailFeedback from "@/components/object/ui/DetailFeedback";
import useDispatchHandler from "../../../hooks/model/useDispatchHandler";

function ModalSignUpViewing(props) {
    const {i18n, managerData} = props

    const events = useDispatchHandler()

    const modalSignUpViewing = useSelector(state => state?.events?.modalSignUpViewing)

    const mediaQuerySm = useMediaMaxState({screenSize: 768})

    const disabledModalHandle = () => events.closeModalSignUpViewingHandler()

    const InputBox = ({label, value, disabled}) => (
        <div className={styles['form_box']}>
            <Input
                label={label}
                value={value}
                disabled={disabled}
            />
        </div>
    );

    return (
        <ModalContainer
            active={modalSignUpViewing}
            disabled={disabledModalHandle}
        >
            <div className={styles['object_sign_up_modal']}>
                <form className={styles['request_form']}>
                    <InputBox label={'First name'}/>
                    <InputBox label={'Last name'}/>
                    <InputBox label={i18n?.["form.email.title"]}/>
                    <InputBox label={i18n?.["form.phone.title"]}/>

                    <Button
                        title={i18n?.["form.send.title"]}
                        style={{
                            minWidth: "100%"
                        }}
                    />
                </form>
                {
                    !mediaQuerySm && managerData &&
                    <DetailFeedback
                        hideButton
                        i18n={i18n}
                        typeCard={'secondary'}
                        data={managerData}
                    />
                }
            </div>
        </ModalContainer>
    );
}

export default ModalSignUpViewing;
