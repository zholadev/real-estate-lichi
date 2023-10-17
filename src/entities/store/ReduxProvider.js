import React from 'react';
import {Provider} from "react-redux";
import {useStore} from "@/entities/store/store";

function ReduxProvider(props) {
    const {children} = props

    const store = useStore()

    return (
        <Provider store={store}>{children}</Provider>
    );
}

export default ReduxProvider;
