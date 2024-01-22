import axios, { AxiosResponse } from 'axios';
import { Logger } from '../services/logger/logger';
import { showStatusNotificationBanner } from './status-notification-banner';

export const simpleRequest = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T | undefined> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
        } else {
            const unexpectedErrorMessage = 'Unexpected error occurred.';
            Logger.logError(unexpectedErrorMessage);
        }
    }
};

export const requestWithNotifications = async <T>(
    promise: Promise<AxiosResponse<T>>,
    showSuccessMessage: boolean,
    messages?: { success?: string; error?: string },
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<T | undefined> => {
    if (setError) {
        setError(undefined);
    }
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            if (showSuccessMessage) {
                const message = messages?.success ? messages.success : 'Request resolved';
                showStatusNotificationBanner(true, message);
            }
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            const message = messages?.error
                ? messages.error
                : error.response?.data.status_message
                ? error.response.data.status_message
                : error.message;
            if (setError) {
                setError(message);
            }
            showStatusNotificationBanner(false, message);
        } else {
            const unexpectedErrorMessage = 'Unexpected error occurred.';
            Logger.logError(unexpectedErrorMessage);
            showStatusNotificationBanner(false, unexpectedErrorMessage);
        }
    }
};

export const requestWithNotificationsAndPendingSetter = async <T>(
    promise: Promise<AxiosResponse<T>>,
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
    showSuccessMessage: boolean,
    messages?: { success?: string; error?: string },
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<T | undefined> => {
    setIsPending(true);
    if (setError) {
        setError(undefined);
    }
    try {
        const response = await promise;
        const data = response.data;
        if (data) {
            if (showSuccessMessage) {
                const message = messages?.success ? messages.success : 'Request resolved';
                showStatusNotificationBanner(true, message);
            }
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Logger.logAxiosError(error);
            const message = messages?.error
                ? messages.error
                : error.response?.data.status_message
                ? error.response.data.status_message
                : error.message;
            if (setError) {
                setError(message);
            }
            showStatusNotificationBanner(false, message);
        } else {
            const unexpectedErrorMessage = 'Unexpected error occurred.';
            Logger.logError(unexpectedErrorMessage);
            showStatusNotificationBanner(false, unexpectedErrorMessage);
        }
    } finally {
        setIsPending(false);
    }
};
