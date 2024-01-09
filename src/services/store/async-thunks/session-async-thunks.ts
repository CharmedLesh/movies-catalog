import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPromises } from '../../api/promises';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';
import { ISessionData } from '../../../configs/interfaces/auth.interfaces';

export const createSession = createAsyncThunk('session', async (requestToken: string, { rejectWithValue }) => {
    try {
        const accessTokenRequestResponse = await AuthPromises.getAccessToken(requestToken);
        const accessToken = accessTokenRequestResponse.data.access_token;
        const accountId = accessTokenRequestResponse.data.account_id;
        const sessionIdRequestResponse = await AuthPromises.getSessionId(accessToken);
        const sessionId = sessionIdRequestResponse.data.session_id;
        const localStorageSessionData = new LocalStorageExpirable<ISessionData>({
            key: 'SESSION_DATA',
            expirationTimeInMinutes: 240
        });
        const sessionData = { accessToken, accountId, sessionId };
        if (sessionData) {
            localStorageSessionData.set(sessionData);
        }
        return sessionData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data.status_code === 41
                    ? 'Permission to process your data was not approved. Make sure you approve data processing when signing in.'
                    : error.response?.data.status_message
                    ? error.response.data.status_message
                    : error.message;
            return rejectWithValue(message);
        }
        return rejectWithValue('Unexpected error occurred.');
    }
});
