import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from "@/entities/store/model/reducers/counter";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice.reducer
        }
    })
}
