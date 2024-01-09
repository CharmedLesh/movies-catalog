import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useSession } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { IListsCollection } from '../../configs/interfaces/lists.interfaces';
import { ErrorBanner } from '../../components';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-cards-grid';
import { ScrollLoader } from './components/scroll-loader/scroll-loader';
import { ScrollToTopButton } from './components/scroll-to-top-button/scroll-to-top-button';

export const AccountListsGrid: FC = () => {
    const footerHeight = document.getElementsByTagName('footer')[0]
        ? document.getElementsByTagName('footer')[0].offsetHeight
        : 107;

    const { isSession, accountId } = useSession();
    const dispatch = useAppDispatch();

    const [lists, setLists] = useState<IListsCollection>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isNextPageRequested, setIsNextPageRequested] = useState<boolean>(false);
    const [showScrollToTopButton, setShowScrollToTopButton] = useState<boolean>(false);
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
        if (isSession && accountId) {
            const data = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.getListsCollection(accountId, 1),
                setIsPending,
                false,
                undefined,
                setError
            );
            if (data) {
                setLists(data);
            }
            setIsNextPageRequested(false);
        }
    };

    const getNextPageOfLists = async () => {
        if (lists && lists?.total_pages > lists?.page) {
            if (isSession && accountId) {
                const data = await requestWithNotificationsAndPendingSetter(
                    dispatch,
                    ListsPromises.getListsCollection(accountId, lists.page + 1),
                    setIsPending,
                    false
                );
                if (data) {
                    data.results = [...lists.results, ...data.results];
                    setLists(data);
                }
            }
        }
    };

    const handleScroll = () => {
        if (!isPending && !isNextPageRequested) {
            const userPosition = window.innerHeight + document.documentElement.scrollTop;
            const requestTriggerHeight = document.documentElement.offsetHeight - 107;
            if (userPosition > requestTriggerHeight) {
                setIsNextPageRequested(true);
            }
        }
        const isScrolledToTop = document.documentElement && document.documentElement.scrollTop < 400;
        setShowScrollToTopButton(!isScrolledToTop);
    };

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    if (isPending && !lists) return <ListsCardsGrid lists={[]} isPending={true} />;

    if (lists && isPending)
        return (
            <>
                <ListsCardsGrid lists={lists.results} isPending={false} />
                <ScrollLoader />
                {showScrollToTopButton && <ScrollToTopButton footerHeight={footerHeight} />}
            </>
        );

    return lists?.results ? (
        <>
            <ListsCardsGrid lists={lists.results} isPending={isPending} />
            {showScrollToTopButton && <ScrollToTopButton footerHeight={footerHeight} />}
        </>
    ) : (
        <NoListsBanner />
    );
};
