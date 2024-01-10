import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// interface for the slice state
export interface IModalLightboxPopupState {
    content: JSX.Element | null;
}

// interface for initial state
const initialState: IModalLightboxPopupState = {
    content: null
};

export const modalLightboxPopupSlice = createSlice({
    name: 'modal-lightbox-popup',
    initialState,
    reducers: {
        dropModalLightboxPopupState: (state) => {
            state.content = null;
        },
        setModalLightboxPopupState: (state, action: PayloadAction<{ content: JSX.Element }>) => {
            state.content = action.payload.content;
        }
    }
});

export const { dropModalLightboxPopupState, setModalLightboxPopupState } = modalLightboxPopupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModalLightboxPopup = (state: RootState) => state.modalLightboxPopup;

export default modalLightboxPopupSlice.reducer;
