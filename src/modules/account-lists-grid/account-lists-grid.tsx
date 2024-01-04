import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useSessionId } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { Logger } from '../../services/logger/logger';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { IListsCollection } from '../../configs/interfaces/lists.interfaces';
import { ErrorBanner } from '../../components';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-cards-grid';
import { ScrollLoader } from './components/scroll-loader/scroll-loader';

export const AccountListsGrid: FC = () => {
    const { sessionId } = useSessionId();
    const dispatch = useAppDispatch();

    const [lists, setLists] = useState<IListsCollection>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isNextPageRequested, setIsNextPageRequested] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        getInitialListsData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lists]);

    useEffect(() => {
        if (isNextPageRequested) {
            getNextPageOfLists();
        }
    }, [isNextPageRequested]);

    const getInitialListsData = async () => {
        if (sessionId) {
            const data = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.getListsCollection(sessionId, 1),
                setIsPending,
                false,
                undefined,
                setError
            );
            if (data) {
                setLists(data);
            }
            setIsNextPageRequested(false);
        } else {
            Logger.logError('Session id not found');
        }
    };

    const getNextPageOfLists = async () => {
        if (lists && lists?.total_pages > lists?.page) {
            if (sessionId) {
                const data = await requestWithNotificationsAndPendingSetter(
                    dispatch,
                    ListsPromises.getListsCollection(sessionId, lists.page + 1),
                    setIsPending,
                    false
                );
                if (data) {
                    data.results = [...lists.results, ...data.results];
                    setLists(data);
                }
            } else {
                Logger.logError('Session id not found');
            }
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
            !isPending &&
            !isNextPageRequested
        ) {
            setIsNextPageRequested(true);
        }
    };

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    if (isPending && !lists) return <ListsCardsGrid lists={[]} isPending={true} />;

    if (lists && isPending)
        return (
            <>
                <ListsCardsGrid lists={lists.results} isPending={false} />
                <ScrollLoader />
            </>
        );

    return lists?.results ? <ListsCardsGrid lists={lists.results} isPending={isPending} /> : <NoListsBanner />;
};
