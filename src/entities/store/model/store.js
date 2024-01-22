import {configureStore} from '@reduxjs/toolkit'
import {eventsSlice} from "./reducers/events";

export const makeStore = () => {
    return configureStore({
        reducer: {
            events: eventsSlice.reducer
        }
    })
}
