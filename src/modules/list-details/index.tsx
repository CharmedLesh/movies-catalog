import { FC, useState } from 'react';
import { useUser } from '../../services/hooks/store-hooks';
import { useInfiniteScroll } from '../../services/hooks/infinite-scroll';
import { ListsPromises } from '../../services/api/promises';
import { IMediaItem } from '../../interfaces/media.interfaces';
import { IListDetailsWithoutPageDependingData } from '../../interfaces/lists.interfaces';
import { SortingTypeV4 } from '../../interfaces/shared.interfaces';
import { ErrorBanner } from '../../components';
import { EssentialInfo } from './components/essential-info/essential-info';
import { ListItemsGrid } from './components/list-items-grid/list-items-grid';
import { AddItemsButton } from './components/add-items-button/add-items-button';
import { ScrollLoader } from './components/scroll-loader/scroll-loader';

interface IListDetailsProps {
    listId: number;
    isEditable: boolean;
}

export const ListDetails: FC<IListDetailsProps> = (props) => {
    const { listId, isEditable } = props;
    const { user } = useUser();
    const userLang = user ? user.iso_639_1 : 'en-US';

    const [sorting, setSorting] = useState<SortingTypeV4>('original_order.asc');

    const getPromiseForInfiniteScroll = (page: number) => {
        return ListsPromises.getListDetails(listId, page, sorting, userLang);
    };

    const { data, isPending, error } = useInfiniteScroll<IListDetailsWithoutPageDependingData, IMediaItem>(
        getPromiseForInfiniteScroll,
        sorting
    );

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    if (data && isPending)
        return (
            <>
                <EssentialInfo
                    isPending={false}
                    isEditable={isEditable}
                    listId={listId.toString()}
                    setSorting={setSorting}
                    list={data}
                />
                <ListItemsGrid isPending={false} items={data?.results} comments={data?.comments} />
                <ScrollLoader />
            </>
        );

    return (
        <>
            <EssentialInfo
                isPending={isPending}
                isEditable={isEditable}
                listId={listId.toString()}
                setSorting={setSorting}
                list={data}
            />
            <ListItemsGrid isPending={isPending} items={data?.results} comments={data?.comments} />
            <AddItemsButton />
        </>
    );
};
