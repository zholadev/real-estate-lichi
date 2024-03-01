import {configureStore} from '@reduxjs/toolkit'
import {eventsSlice} from "./reducers/events";
import {filterMiniSearchSlice} from "./reducers/filterMiniSearch";
import {catalogSlice} from "./reducers/catalog";
import {filterCatalogSlice} from "./reducers/filterCatalog";
import {filterDataSlice} from "./reducers/filterData";

export const makeStore = () => {
    return configureStore({
        reducer: {
            events: eventsSlice.reducer,
            filterMiniSearchSlice: filterMiniSearchSlice.reducer,
            catalog: catalogSlice.reducer,
            filterCatalog: filterCatalogSlice.reducer,
            filterData: filterDataSlice.reducer
        }
    })
}
