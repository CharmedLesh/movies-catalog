import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// interface for the slice state
export interface IUserState {
    sessionToken: string | null;
}

// interface for initial state
const initialState: IUserState = {
    sessionToken: null
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` infers the state type from the `initialState` argument
    initialState,
    reducers: {
        removeSessionToken: (state) => {
            state.sessionToken = null;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setSessionToken: (state, action: PayloadAction<string>) => {
            state.sessionToken = action.payload;
        }
    }
});

export const { removeSessionToken, setSessionToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionToken = (state: RootState) => state.user.sessionToken;

export default userSlice.reducer;
