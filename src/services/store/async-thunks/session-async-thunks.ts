import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPromises } from '../../api/promises';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';

export const createSession = createAsyncThunk('session', async (requestToken: string, { rejectWithValue }) => {
    try {
        const accessTokenRequestResponse = await AuthPromises.getAccessToken(requestToken);
        const accessToken = accessTokenRequestResponse.data.access_token;
        const sessionIdRequestResponse = await AuthPromises.getSessionId(accessToken);
        const sessionId = sessionIdRequestResponse.data.session_id;
        const localStorageAccessToken = new LocalStorageExpirable<string>({
            key: 'ACCESS_TOKEN',
            expirationTimeInMinutes: 240
        });
        const localStorageSessionId = new LocalStorageExpirable<string>({
            key: 'SESSION_ID',
            expirationTimeInMinutes: 240
        });
        localStorageAccessToken.set(accessToken);
        localStorageSessionId.set(sessionId);
        return { accessToken, sessionId };
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
