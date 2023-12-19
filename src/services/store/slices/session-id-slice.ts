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

const localstorageExpirable = new LocalStorageExpirable<string>({ key: 'SESSION_ID', expirationTimeInMinutes: null });

// interface for initial state
const initialState: ISessionIdState = {
    sessionId: localstorageExpirable.get(),
    status: null,
    error: null
};

export const sessionIdSlice = createSlice({
    name: 'session-id',
    initialState,
    reducers: {
        removeSessionIdStatus: (state) => {
            state.status = null;
        },
        removeSessionId: (state) => {
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
                state.sessionId = action.payload;
            }
        });
        builder.addCase(getSessionId.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload as string;
        });
    }
});

export const { removeSessionIdStatus, removeSessionId } = sessionIdSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionId = (state: RootState) => state.sessionId.sessionId;

export default sessionIdSlice.reducer;