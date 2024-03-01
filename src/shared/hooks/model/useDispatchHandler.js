import {useDispatch} from "react-redux";
import {
    closeModalPickUp,
    closeModalSignUpViewing,
    openModalPickUp,
    openModalSignUpViewing
} from "@/entities/store/model/reducers/events";
import {errorHandler} from "@/entities/errorHandler/errorHandler";
import {
    filterApartmentListDataReducer,
    filterDistrictDataReducer,
    filterMiniSearchResetReducer,
    filterPropertyTypeDataReducer,
    filterQueryApartmentDataReducer,
    filterQueryDataReducer,
    filterResidenceDataReducer,
    filterRoomsDataReducer
} from "@/entities/store/model/reducers/filterMiniSearch";
import {
    catalogContentReducer,
    catalogObjectMapDataReducer,
    catalogResidenceMapDataReducer,
    catalogTypeReducer
} from "@/entities/store/model/reducers/catalog";
import {
    filterCtgAllDataReducer,
    filterCtgApiQueriesDataReducer,
    filterCtgClearReducer,
    filterCtgObjectDataReducer,
    filterCtgObjectQueriesReducer,
    filterCtgPriceFromReducer,
    filterCtgPriceValueReducer,
    filterCtgQueriesDataFillReducer,
    filterCtgQueriesDataReducer,
    filterCtgResidenceDataReducer,
    filterCtgSidebarReducer
} from "@/entities/store/model/reducers/filterCatalog";
import {
    filterDistrictStaticDataReducer, filterPropertyTypeStaticDataReducer, filterResidenceStaticDataReducer,
    filterRoomsStaticDataReducer,
    filterTagStaticDataReducer
} from "@/entities/store/model/reducers/filterData";

/**
 * @author Zholaman Zhumanov
 * @created 22.01.2024
 * @returns {{}}
 * @description Wrapper function to map dispatch actions to handlers.
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
        /**
         * @author Zholaman Zhumanov
         * @description filterData actions
         * @return {*}
         * @param data
         */
        filterTagStaticDataAction: (data) => dispatch(filterTagStaticDataReducer(data)),
        filterRoomsStaticDataAction: (data) => dispatch(filterRoomsStaticDataReducer(data)),
        filterDistrictStaticDataAction: (data) => dispatch(filterDistrictStaticDataReducer(data)),
        filterResidenceStaticDataAction: (data) => dispatch(filterResidenceStaticDataReducer(data)),
        filterPropertyTypeStaticDataAction: (data) => dispatch(filterPropertyTypeStaticDataReducer(data)),

        /**
         * @author Zholaman Zhumanov
         * @description catalog actions
         * @return {*}
         * @param value
         */
        filterCtgPriceFromAction: (value) => dispatch(filterCtgPriceFromReducer(value)),
        filterCtgPriceValueAction: (value) => dispatch(filterCtgPriceValueReducer(value)),
        filterCtgAllDataAction: (value) => dispatch(filterCtgAllDataReducer(value)),
        filterCtgSidebarAction: (value) => dispatch(filterCtgSidebarReducer(value)),
        filterCtgClearAction: (value) => dispatch(filterCtgClearReducer(value)),
        filterCtgObjectQueriesAction: (value) => dispatch(filterCtgObjectQueriesReducer(value)),
        filterCtgObjectDataAction: (value) => dispatch(filterCtgObjectDataReducer(value)),
        filterCtgResidenceDataAction: (value) => dispatch(filterCtgResidenceDataReducer(value)),
        filterCtgQueriesDataAction: (value) => dispatch(filterCtgQueriesDataReducer(value)),
        filterCtgQueriesDataFillAction: (value) => dispatch(filterCtgQueriesDataFillReducer(value)),
        filterCtgApiQueriesDataAction: (value) => dispatch(filterCtgApiQueriesDataReducer(value)),

        /**
         * @author Zholaman Zhumanov
         * @description catalog actions
         * @return {*}
         * @param value
         */
        catalogTypeAction: (value) => dispatch(catalogTypeReducer(value)),
        catalogContentAction: (value) => dispatch(catalogContentReducer(value)),
        catalogObjectMapDataAction: (data) => dispatch(catalogObjectMapDataReducer(data)),
        catalogResidenceMapDataAction: (data) => dispatch(catalogResidenceMapDataReducer(data)),

        /**
         * @author Zholaman Zhumanov
         * @description filterMiniSearch actions
         * @param data
         * @return {*}
         */
        filterSearchQueryDataAction: (data) => dispatch(filterQueryDataReducer(data)),
        filterSearchRoomsDataAction: (data) => dispatch(filterRoomsDataReducer(data)),
        filterSearchDistrictDataAction: (data) => dispatch(filterDistrictDataReducer(data)),
        filterSearchResidenceDataAction: (data) => dispatch(filterResidenceDataReducer(data)),
        filterSearchPropertyTypeDataAction: (data) => dispatch(filterPropertyTypeDataReducer(data)),
        filterSearchApartmentListDataAction: (data) => dispatch(filterApartmentListDataReducer(data)),
        filterSearchQueryApartmentDataAction: (data) => dispatch(filterQueryApartmentDataReducer(data)),
        filterMiniSearchResetAction: createDispatchHandler(dispatch, filterMiniSearchResetReducer, "filterMiniSearchResetReducer"),

        /**
         * @author Zholaman Zhumanov
         * @description eventSlice actions
         */
        openModalPickUpHandler: createDispatchHandler(dispatch, openModalPickUp, "openModalPickUpHandler"),
        closeModalPickUpHandler: createDispatchHandler(dispatch, closeModalPickUp, "closeModalPickUpHandler"),
        openModalSignUpViewingHandler: createDispatchHandler(dispatch, openModalSignUpViewing, "openModalSignUpViewingHandler"),
        closeModalSignUpViewingHandler: createDispatchHandler(dispatch, closeModalSignUpViewing, "closeModalSignUpViewingHandler"),
    };
}

export default useDispatchHandler;
