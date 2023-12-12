import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPromises } from '../../auth/auth-promises';

export const getSessionId = createAsyncThunk('user/session', async (requestToken: string, { rejectWithValue }) => {
    try {
        const response = await AuthPromises.getSessionId(requestToken);
        const sessionId = response.data.session_id;
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
