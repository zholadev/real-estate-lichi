import {createSlice} from '@reduxjs/toolkit';

export const filterDataSlice = createSlice({
    name: 'filterData',
    initialState: {
        filterTagStaticData: [],
        filterRoomsStaticData: [],
        filterDistrictStaticData: [],
        filterResidenceStaticData: [],
        filterPropertyTypeStaticData: [],
    },
    reducers: {
        filterTagStaticDataReducer: (state, action) => {
            state.filterTagStaticData = action.payload;
        },
        filterRoomsStaticDataReducer: (state, action) => {
            state.filterRoomsStaticData = action.payload;
        },
        filterDistrictStaticDataReducer: (state, action) => {
            state.filterDistrictStaticData = action.payload;
        },
        filterResidenceStaticDataReducer: (state, action) => {
            state.filterResidenceStaticData = action.payload;
        },
        filterPropertyTypeStaticDataReducer: (state, action) => {
            state.filterPropertyTypeStaticData = action.payload;
        },
        filterDataClearStateReducer: (state) => {
            state.filterTagStaticData = []
            state.filterRoomsStaticData = []
            state.filterDistrictStaticData = []
            state.filterResidenceStaticData = []
            state.filterPropertyTypeStaticData = []
        }
    },
});
export const {
    filterTagStaticDataReducer,
    filterDataClearStateReducer,
    filterRoomsStaticDataReducer,
    filterDistrictStaticDataReducer,
    filterResidenceStaticDataReducer,
    filterPropertyTypeStaticDataReducer,
} = filterDataSlice.actions;
