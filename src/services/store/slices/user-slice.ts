import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getSessionId } from '../async-thunks/user-async-thunks';

// interface for the slice state
export interface IUserState {
    sessionId: string | null;
    status: null | 'pending' | 'resolved' | 'rejected';
    error: null | string;
}

// interface for initial state
const initialState: IUserState = {
    sessionId: null,
    status: null,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserStatus: (state) => {
            state.status = null;
        },
        removeUser: (state) => {
            state.sessionId = null;
        }
    },
    extraReducers: (builder) => {
        // get session id cases
        builder.addCase(getSessionId.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(getSessionId.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload) {
                // fix required: set to localstorage here
                state.sessionId = action.payload;
            }
        });
        builder.addCase(getSessionId.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload as string;
        });
    }
});

export const { removeUserStatus, removeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionId = (state: RootState) => state.user.sessionId;

export default userSlice.reducer;
