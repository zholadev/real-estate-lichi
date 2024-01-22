import {createSlice} from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        modalPickUpObject: false,
        modalSignUpViewing: false,
    },
    reducers: {
        openModalPickUp: state => {
            state.modalPickUpObject = true;
        },
        closeModalPickUp: state => {
            state.modalPickUpObject = false;
        },
        openModalSignUpViewing: state => {
            state.modalSignUpViewing = true;
        },
        closeModalSignUpViewing: state => {
            state.modalSignUpViewing = false;
        },
    },
});
export const {openModalPickUp, closeModalPickUp, closeModalSignUpViewing, openModalSignUpViewing} = eventsSlice.actions;
