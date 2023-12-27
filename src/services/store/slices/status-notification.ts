import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// interface for the slice state
export interface IStatusNotificationState {
    isSuccess: boolean | null;
    message: string | null;
}

// interface for initial state
const initialState: IStatusNotificationState = {
    isSuccess: null,
    message: null
};

export const statusNotificationSlice = createSlice({
    name: 'status-notification',
    initialState,
    reducers: {
        dropStatusNotificationState: (state) => {
            state.isSuccess = null;
            state.message = null;
        },
        setStatusNotificationState: (state, action: PayloadAction<{ isSuccess: boolean; message: string }>) => {
            state.isSuccess = action.payload.isSuccess;
            state.message = action.payload.message;
        }
    }
});

export const { dropStatusNotificationState, setStatusNotificationState } = statusNotificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatusNotification = (state: RootState) => state.statusNotification;

export default statusNotificationSlice.reducer;
