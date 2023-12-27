import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Logger } from '../logger/logger';

type StatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

interface UseStatusedAsyncFetchProps<T> {
    promise: Promise<AxiosResponse<T, any>>;
}

interface IUseStatusedAsyncFetchResult<T> {
    status: StatusType;
    data: T | null;
    error: string | null;
}

export const useStatusedAsyncFetch = <T>(props: UseStatusedAsyncFetchProps<T>): IUseStatusedAsyncFetchResult<T> => {
    const { promise } = props;

    const [status, setStatus] = useState<StatusType>('idle');
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setStatus('pending');
            const response: AxiosResponse<T, any> = await promise;
            setData(response.data);
            setStatus('resolved');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
                Logger.logAxiosError(error);
            } else {
                setError('An error occurred');
            }
            setStatus('rejected');
        }
    };

    useEffect(() => {
        fetchData();
    }, [promise]);

    return { status, data, error };
};
