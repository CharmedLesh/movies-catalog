import { FC } from 'react';
import { useSession } from '../../services/hooks/store-hooks';
import { useInfiniteScroll } from '../../services/hooks/infinite-scroll';
import { ListsPromises } from '../../services/api/promises';
import { IListGeneralInfo } from '../../configs/interfaces/lists.interfaces';
import { ErrorBanner } from '../../components';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-cards-grid';
import { ScrollLoader } from './components/scroll-loader/scroll-loader';

export const AccountListsGrid: FC = () => {
    const { isSession, accountId } = useSession();

    const getPromiseForInfiniteScroll = (page: number) => {
        if (isSession && accountId) {
            return ListsPromises.getListsCollection(accountId, page);
        }
        return null;
    };

    const { data, isPending, error } = useInfiniteScroll<{}, IListGeneralInfo>(getPromiseForInfiniteScroll);

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    if (data && isPending)
        return (
            <>
                <ListsCardsGrid lists={data.results} isPending={false} />
                <ScrollLoader />
            </>
        );

    return <ListsCardsGrid lists={data?.results} isPending={isPending} />;
};
