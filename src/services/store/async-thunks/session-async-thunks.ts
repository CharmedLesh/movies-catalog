import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPromises } from '../../auth/auth-promises';
import { LocalStorageExpirable } from '../../localstorage/localstorage-expirable';

export const getSessionId = createAsyncThunk('session', async (requestToken: string, { rejectWithValue }) => {
    try {
        const response = await AuthPromises.getSessionId(requestToken);
        const sessionId = response.data.session_id;
        const localStorageExpirable = new LocalStorageExpirable<string>({
            key: 'SESSION_ID',
            expirationTimeInMinutes: 60
        });
        localStorageExpirable.set(sessionId);
        return sessionId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.message;
            if (message) {
                return rejectWithValue(message);
            }

            return rejectWithValue('Unexpected error occured');
        }
        const message = String(error);
        return rejectWithValue(message);
    }
});
