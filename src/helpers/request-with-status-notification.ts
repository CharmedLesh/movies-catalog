import axios, { AxiosResponse } from 'axios';
import { Logger } from '../services/logger/logger';
import { setStatusNotificationState } from '../services/store/slices/status-notification';
import { AppDispatch } from '../services/store/store';

export const requestWithErrorNotification = async <T>(
    dispatch: AppDispatch,
    promise: Promise<AxiosResponse<T>>
): Promise<T | undefined> => {
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            dispatch(setStatusNotificationState({ isSuccess: false, message: error.message }));
        }
    }
};

export const requestWithNotifications = async <T>(
    dispatch: AppDispatch,
    promise: Promise<AxiosResponse<T>>,
    successMessage?: string
): Promise<T | undefined> => {
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            dispatch(
                setStatusNotificationState({
                    isSuccess: true,
                    message: successMessage ? successMessage : 'Request resolved'
                })
            );
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            dispatch(setStatusNotificationState({ isSuccess: false, message: error.message }));
        }
    }
};
