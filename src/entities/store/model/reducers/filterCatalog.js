import {createSlice} from '@reduxjs/toolkit';
import {extractSetFilter} from "@/shared/utilites/model/extractSetFilter";

export const filterCatalogSlice = createSlice({
    name: 'filterCatalog',
    initialState: {
        filterCtgPriceFrom: null,
        filterCtgPriceValue: '',
        filterCtgAllData: [],
        filterCtgSidebar: false,
        filterCtgClear: "fill",
        filterCtgObjectQueries: {},
        filterCtgObjectData: [],
        filterCtgResidenceData: [],
        filterCtgQueriesData: {},
        filterCtgApiQueriesData: {"filters[apartments][name][$notNull]": true},
    },
    reducers: {
        filterCtgPriceFromReducer: (state, action) => {
            state.filterCtgPriceFrom = action.payload;
        },
        filterCtgPriceValueReducer: (state, action) => {
            state.filterCtgPriceValue = action.payload;
        },
        filterCtgAllDataReducer: (state, action) => {
            state.filterCtgAllData = action.payload;
        },
        filterCtgSidebarReducer: (state, action) => {
            state.filterCtgSidebar = action.payload;
        },
        filterCtgClearReducer: (state, action) => {
            state.filterCtgClear = action.payload;
        },
        filterCtgObjectDataReducer: (state, action) => {
            state.filterCtgObjectData = action.payload;
        },
        filterCtgResidenceDataReducer: (state, action) => {
            state.filterCtgResidenceData = action.payload;
        },
        filterCtgObjectQueriesClearReducer: (state, action) => {
            state.filterCtgObjectQueries = {}
        },
        filterCtgQueriesDataClearReducer: (state, action) => {
            state.filterCtgQueriesData = {}
        },
        filterCtgObjectQueriesReducer: (state, action) => {
            state.filterCtgObjectQueries = extractSetFilter(state.filterCtgObjectQueries, action.payload?.key, action.payload?.value, true);
        },
        filterCtgQueriesDataReducer: (state, action) => {
            state.filterCtgQueriesData = extractSetFilter(state.filterCtgQueriesData, action.payload?.key, action.payload?.value, true);
        },
        filterCtgQueriesDataFillReducer: (state, action) => {
            state.filterCtgQueriesData = action.payload
        },
        filterCtgApiQueriesDataReducer: (state, action) => {
            state.filterCtgApiQueriesData = action.payload;
        },
        filterCtgClearStatesReducer: (state, action) => {
            state.filterCtgPriceFrom = null
            state.filterCtgPriceValue = ''
            state.filterCtgAllData = []
            state.filterCtgSidebar = false
            state.filterCtgClear = "fill"
            state.filterCtgObjectQueries = {}
            state.filterCtgObjectData = []
            state.filterCtgResidenceData = []
            state.filterCtgQueriesData = {}
            state.filterCtgApiQueriesData = {"filters[apartments][name][$notNull]": true}
        }
    },
});
export const {
    filterCtgPriceFromReducer,
    filterCtgPriceValueReducer,
    filterCtgAllDataReducer,
    filterCtgSidebarReducer,
    filterCtgClearReducer,
    filterCtgObjectQueriesReducer,
    filterCtgObjectDataReducer,
    filterCtgClearStatesReducer,
    filterCtgResidenceDataReducer,
    filterCtgQueriesDataReducer,
    filterCtgApiQueriesDataReducer,
    filterCtgQueriesDataFillReducer,
    filterCtgQueriesDataClearReducer,
    filterCtgObjectQueriesClearReducer
} = filterCatalogSlice.actions;
