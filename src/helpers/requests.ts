import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../services/store/store';
import { setStatusNotificationState } from '../services/store/slices/status-notification';
import { Logger } from '../services/logger/logger';

export const simpleRequest = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T | undefined> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
        }
    }
};

export const requestWithNotifications = async <T>(
    dispatch: AppDispatch,
    promise: Promise<AxiosResponse<T>>,
    showSuccessMessage: boolean,
    messages?: { success?: string; error?: string }
): Promise<T | undefined> => {
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            if (showSuccessMessage) {
                dispatch(
                    setStatusNotificationState({
                        isSuccess: true,
                        message: messages?.success ? messages.success : 'Request resolved'
                    })
                );
            }
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            dispatch(
                setStatusNotificationState({
                    isSuccess: false,
                    message: messages?.error ? messages.error : error.message
                })
            );
        }
    }
};

export const requestWithNotificationsAndPendingSetter = async <T>(
    dispatch: AppDispatch,
    promise: Promise<AxiosResponse<T>>,
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
    showSuccessMessage: boolean,
    messages?: { success?: string; error?: string }
): Promise<T | undefined> => {
    setIsPending(true);
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            if (showSuccessMessage) {
                dispatch(
                    setStatusNotificationState({
                        isSuccess: true,
                        message: messages?.success ? messages.success : 'Request resolved'
                    })
                );
            }
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            dispatch(
                setStatusNotificationState({
                    isSuccess: false,
                    message: messages?.error ? messages.error : error.message
                })
            );
        }
    } finally {
        setIsPending(false);
    }
};