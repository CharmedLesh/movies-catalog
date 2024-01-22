import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createSession } from '../async-thunks/session-async-thunks';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';
import { ISessionData } from '../../../interfaces/auth.interfaces';

// interface for the slice state
export interface ISessionState {
    accessToken: string | null;
    accountId: string | null;
    sessionId: string | null;
    status: null | 'pending' | 'resolved' | 'rejected';
    error: null | string;
}

const localStorageSessionData = new LocalStorageExpirable<ISessionData>({
    key: 'SESSION_DATA',
    expirationTimeInMinutes: 240
});

const getSessionDataFromLocalStorage = (): ISessionData | null => {
    const data = localStorageSessionData.getAndUpdate();
    if (data) {
        if (data.accessToken && data.accountId && data.sessionId) {
            return { accessToken: data.accessToken, accountId: data.accountId, sessionId: data.sessionId };
        }
        localStorageSessionData.remove();
    }
    return null;
};

const initialSessionData = getSessionDataFromLocalStorage();

// interface for initial state
const initialState: ISessionState = {
    accessToken: initialSessionData?.accessToken ? initialSessionData.accessToken : null,
    accountId: initialSessionData?.accountId ? initialSessionData.accountId : null,
    sessionId: initialSessionData?.sessionId ? initialSessionData.sessionId : null,
    status: null,
    error: null
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        removeSession: (state) => {
            state.accessToken = null;
            state.accountId = null;
            state.sessionId = null;
            state.status = null;
            localStorageSessionData.remove();
        },
        removeSessionStatus: (state) => {
            state.status = null;
        },
        updateSession: (state) => {
            const updatedSessionData = getSessionDataFromLocalStorage();
            if (updatedSessionData) {
                state.accessToken = updatedSessionData.accessToken;
                state.accountId = updatedSessionData.accountId;
                state.sessionId = updatedSessionData.sessionId;
            } else {
                state.accessToken = null;
                state.accountId = null;
                state.sessionId = null;
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
                state.accountId = action.payload.accountId;
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

export const { removeSession, removeSessionStatus, updateSession } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessionId = (state: RootState) => state.session.accessToken;
export const selectAccessToken = (state: RootState) => state.session.accessToken;

export default sessionSlice.reducer;
