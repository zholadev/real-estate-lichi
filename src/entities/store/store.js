'use client'

import {useMemo} from 'react'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers';
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";

let store;

function initStore(initialState) {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined
    }

    if (typeof window === 'undefined') return _store
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState])
}
