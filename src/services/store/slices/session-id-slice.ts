import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getSessionId } from '../async-thunks/session-async-thunks';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';

// interface for the slice state
export interface ISessionIdState {
    sessionId: string | null;
    status: null | 'pending' | 'resolved' | 'rejected';
    error: null | string;
}

const localstorageExpirable = new LocalStorageExpirable<string>({ key: 'SESSION_ID', expirationTimeInMinutes: 240 });

// interface for initial state
const initialState: ISessionIdState = {
    sessionId: localstorageExpirable.getAndResetIfNotExpired(),
    status: null,
    error: null
};

export const sessionIdSlice = createSlice({
    name: 'session-id',
    initialState,
    reducers: {
        removeSessionId: (state) => {
            state.sessionId = null;
            state.status = null;
            localstorageExpirable.remove();
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
                state.sessionId = action.payload;
            }
        });
        builder.addCase(getSessionId.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload as string;
        });
    }
});

export const { removeSessionId } = sessionIdSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionId = (state: RootState) => state.sessionId.sessionId;

export default sessionIdSlice.reducer;
