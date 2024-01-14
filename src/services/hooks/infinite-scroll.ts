import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store-hooks';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { hideScrollToTopButton, showScrollToTopButton } from '../../helpers/scroll-to-top-button';
import { IPageNumberDependingCollection } from '../../configs/interfaces/shared.interfaces';
import { Logger } from '../logger/logger';

export const useInfiniteScroll = <T, U>(
    getPromiseForInfiniteScroll: (page: number) => Promise<AxiosResponse<T & IPageNumberDependingCollection<U>>> | null
) => {
    const dispatch = useAppDispatch();
    const footerHeight: number = 107;

    const [data, setData] = useState<T & IPageNumberDependingCollection<U>>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isNextPageRequested, setIsNextPageRequested] = useState<boolean>(false);
    const [isShowScrollToTopButton, setIsShowScrollToTopButton] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        getInitialPageData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data]);

    useEffect(() => {
        if (isNextPageRequested) {
            getNextPageData();
        }
    }, [isNextPageRequested]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isShowScrollToTopButton) {
            showScrollToTopButton();
        } else {
            timer = setTimeout(() => {
                hideScrollToTopButton();
            });
        }

        return () => clearTimeout(timer);
    }, [isShowScrollToTopButton]);

    const getInitialPageData = async () => {
        const promise = getPromiseForInfiniteScroll(1);
        if (promise) {
            const initialPageData = await requestWithNotificationsAndPendingSetter(
                dispatch,
                promise,
                setIsPending,
                false,
                undefined,
                setError
            );
            if (initialPageData) {
                setData(initialPageData);
            }
        } else {
            setError('Unexpected error occurred');
            Logger.logError('Promise not found. Check params.');
        }
    };

    const getNextPageData = async () => {
        if (data && data.total_pages > data.page) {
            const promise = getPromiseForInfiniteScroll(data.page + 1);

            if (promise) {
                const nextPageData = await requestWithNotificationsAndPendingSetter(
                    dispatch,
                    promise,
                    setIsPending,
                    false
                );

                if (nextPageData) {
                    nextPageData.results = [...data.results, ...nextPageData.results];
                    if (nextPageData.comments && data.comments) {
                        Object.assign(nextPageData.comments, data.comments);
                    }
                    setData(nextPageData);
                }
            } else {
                setError('Unexpected error occurred');
                Logger.logError('Promise not found. Check params.');
            }
        }
        setIsNextPageRequested(false);
    };

    const handleScroll = () => {
        if (!isPending && !isNextPageRequested) {
            const userPosition = window.innerHeight + document.documentElement.scrollTop;
            const requestTriggerHeight = document.documentElement.offsetHeight - footerHeight;
            if (userPosition > requestTriggerHeight) {
                setIsNextPageRequested(true);
            }
        }
        const isScrolledToTop = document.documentElement && document.documentElement.scrollTop < 400;
        setIsShowScrollToTopButton(!isScrolledToTop);
    };

    return { data, isPending, error };
};
