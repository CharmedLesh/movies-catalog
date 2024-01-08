import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createSession } from '../async-thunks/session-async-thunks';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';

// interface for the slice state
export interface ISessionState {
    accessToken: string | null;
    sessionId: string | null;
    status: null | 'pending' | 'resolved' | 'rejected';
    error: null | string;
}

const localstorageAccessToken = new LocalStorageExpirable<string>({
    key: 'ACCESS_TOKEN',
    expirationTimeInMinutes: 240
});

const localstorageSessionId = new LocalStorageExpirable<string>({ key: 'SESSION_ID', expirationTimeInMinutes: 240 });

const checkLocalStorage = () => {
    const isAccessToken = localstorageAccessToken.check();
    const isSessionToken = localstorageSessionId.check();
    const checkResult = !!isAccessToken && !!isSessionToken;
    return checkResult;
};

// interface for initial state
const initialState: ISessionState = {
    accessToken: checkLocalStorage() ? localstorageAccessToken.getAndResetIfNotExpired() : null,
    sessionId: checkLocalStorage() ? localstorageSessionId.getAndResetIfNotExpired() : null,
    status: null,
    error: null
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        removeSession: (state) => {
            state.accessToken = null;
            state.sessionId = null;
            state.status = null;
            localstorageAccessToken.remove();
            localstorageSessionId.remove();
        },
        removeSessionStatus: (state) => {
            state.status = null;
        },
        checkAndUpdateSession: (state) => {
            const isValid = checkLocalStorage();
            if (!isValid) {
                state.accessToken = null;
                state.sessionId = null;
                localstorageAccessToken.remove();
                localstorageSessionId.remove();
            } else {
                state.accessToken = localstorageAccessToken.getAndResetIfNotExpired();
                state.sessionId = localstorageSessionId.getAndResetIfNotExpired();
            }
            state.status = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // create session cases
        builder.addCase(createSession.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(createSession.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload) {
                state.accessToken = action.payload.accessToken;
                state.sessionId = action.payload.sessionId;
            }
        });
        builder.addCase(createSession.rejected, (state, action) => {
            state.status = 'rejected';
            const errorMessage = action.payload as string;
            state.error = errorMessage;
        });
    }
});

export const { removeSession, removeSessionStatus, checkAndUpdateSession } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionId = (state: RootState) => state.session.accessToken;
export const selectAccessToken = (state: RootState) => state.session.accessToken;

export default sessionSlice.reducer;
