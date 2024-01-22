import {useDispatch} from "react-redux";
import {
    closeModalPickUp,
    closeModalSignUpViewing,
    openModalPickUp,
    openModalSignUpViewing
} from "@/entities/store/model/reducers/events";
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 22.01.2024
 * @returns {{}}
 * Wrapper function to map dispatch actions to handlers.
 * @param {Function} dispatch - Dispatch function from react-redux.
 * @param {Function} action - Redux action to be dispatched.
 * @returns {Function} - Handler function that dispatches the provided action when invoked.
 */
function useDispatchHandler() {
    const dispatch = useDispatch()

    const createDispatchHandler = (dispatch, action, name) => () => {
        try {
            dispatch(action())
        } catch (error) {
            errorHandler("useDispatchHandler", name, error)
        }
    };

    return {
        openModalPickUpHandler: createDispatchHandler(dispatch, openModalPickUp, "openModalPickUpHandler"),
        closeModalPickUpHandler: createDispatchHandler(dispatch, closeModalPickUp, "closeModalPickUpHandler"),
        openModalSignUpViewingHandler: createDispatchHandler(dispatch, openModalSignUpViewing, "openModalSignUpViewingHandler"),
        closeModalSignUpViewingHandler: createDispatchHandler(dispatch, closeModalSignUpViewing, "closeModalSignUpViewingHandler"),
    };
}

export default useDispatchHandler;
