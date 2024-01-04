import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccountPromises } from '../../api/promises';

export const getAccountDetails = createAsyncThunk('user', async (sessionId: string, { rejectWithValue }) => {
    try {
        const response = await AccountPromises.getAccountDetails(sessionId);
        const accountDetails = response.data;
        return accountDetails;
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
