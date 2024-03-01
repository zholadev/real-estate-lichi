import {createSlice} from '@reduxjs/toolkit';
import {extractSetFilter} from "@/shared/utilites/model/extractSetFilter";

export const filterMiniSearchSlice = createSlice({
    name: 'filterMiniSearch',
    initialState: {
        filterQueryData: {},
        filterRoomsData: [],
        filterDistrictData: [],
        filterResidenceData: [],
        filterPropertyTypeData: [],
        filterApartmentListData: [],
        filterQueryApartmentData: {},

    },
    reducers: {
        filterQueryDataReducer: (state, action) => {
            console.log(action.payload)
            state.filterQueryData = extractSetFilter(state.filterQueryData, action.payload?.key, action.payload?.value, true)
        },
        filterQueryApartmentDataReducer: (state, action) => {
            state.filterQueryApartmentData = extractSetFilter(state.filterQueryApartmentData, action.payload?.key, action.payload?.value, true)
        },
        filterRoomsDataReducer: (state, action) => {
            state.filterRoomsData = action.payload;
        },
        filterDistrictDataReducer: (state, action) => {
            state.filterDistrictData = action.payload;
        },
        filterResidenceDataReducer: (state, action) => {
            state.filterResidenceData = action.payload;
        },
        filterPropertyTypeDataReducer: (state, action) => {
            state.filterPropertyTypeData = action.payload;
        },
        filterApartmentListDataReducer: (state, action) => {
            state.filterApartmentListData = action.payload;
        },
        filterMiniSearchResetReducer: (state) => {
            state.filterQueryData = {};
            state.filterRoomsData = [];
            state.filterDistrictData = [];
            state.filterDistrictData = [];
            state.filterResidenceData = [];
            state.filterPropertyTypeData = [];
            state.filterApartmentListData = [];
            state.filterQueryApartmentData = {};
        }
    },
});
export const {
    filterQueryDataReducer,
    filterRoomsDataReducer,
    filterDistrictDataReducer,
    filterResidenceDataReducer,
    filterMiniSearchResetReducer,
    filterPropertyTypeDataReducer,
    filterApartmentListDataReducer,
    filterQueryApartmentDataReducer,
} = filterMiniSearchSlice.actions;
