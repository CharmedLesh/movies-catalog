import axios, { AxiosResponse } from 'axios';
import { Logger } from '../services/logger/logger';

export const simpleRequest = async <T,>(promise: Promise<AxiosResponse<T>>): Promise<T | undefined> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
        }
    }
};
