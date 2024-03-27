import {createSlice} from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        catalogType: "list",
        catalogContent: "apartments",
        catalogObjectMapData: [],
        catalogResidenceMapData: [],
    },
    reducers: {
        catalogTypeReducer: (state, action) => {
            console.log("action.payload", action.payload)
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
