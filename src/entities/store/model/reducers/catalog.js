import {createSlice} from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        catalogContent: "list",
        catalogType: "apartments",
        catalogObjectMapData: [],
        catalogResidenceMapData: [],
    },
    reducers: {
        catalogTypeReducer: (state, action) => {
            state.catalogType = action.payload;
        },
        catalogContentReducer: (state, action) => {
            state.catalogContent = action.payload;
        },
        catalogObjectMapDataReducer: (state, action) => {
            state.catalogObjectMapData = action.payload;
        },
        catalogResidenceMapDataReducer: (state, action) => {
            state.catalogResidenceMapData = action.payload;
        },
    },
});
export const {
    catalogTypeReducer,
    catalogContentReducer,
    catalogObjectMapDataReducer,
    catalogResidenceMapDataReducer,
} = catalogSlice.actions;
