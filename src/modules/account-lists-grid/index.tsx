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

    const [listsCollection, setListsCollection] = useState<IListsCollection>();
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
    }, [listsCollection]);

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
                setListsCollection(data);
            }
        }
    };

    const getNextPageOfLists = async () => {
        if (listsCollection && listsCollection?.total_pages > listsCollection?.page) {
            if (isSession && accountId) {
                const data = await requestWithNotificationsAndPendingSetter(
                    dispatch,
                    ListsPromises.getListsCollection(accountId, listsCollection.page + 1),
                    setIsPending,
                    false
                );
                if (data) {
                    data.results = [...listsCollection.results, ...data.results];
                    setListsCollection(data);
                }
            }
        }
        setIsNextPageRequested(false);
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

    if (isPending && !listsCollection) return <ListsCardsGrid lists={[]} isPending={true} />;

    if (listsCollection && isPending)
        return (
            <>
                <ListsCardsGrid lists={listsCollection.results} isPending={false} />
                <ScrollLoader />
                {showScrollToTopButton && <ScrollToTopButton footerHeight={footerHeight} />}
            </>
        );

    return listsCollection?.results ? (
        <>
            <ListsCardsGrid lists={listsCollection.results} isPending={isPending} />
            {showScrollToTopButton && <ScrollToTopButton footerHeight={footerHeight} />}
        </>
    ) : (
        <NoListsBanner />
    );
};
