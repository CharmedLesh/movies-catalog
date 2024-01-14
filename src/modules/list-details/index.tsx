import { FC } from 'react';
import { useUser } from '../../services/hooks/store-hooks';
import { useInfiniteScroll } from '../../services/hooks/infinite-scroll';
import { ListsPromises } from '../../services/api/promises';
import { IMediaItem } from '../../configs/interfaces/media.interfaces';
import { IListDetailsWithoutPageDependingData } from '../../configs/interfaces/lists.interfaces';
import { ErrorBanner } from '../../components';
import { EssentialInfo } from './components/essential-info/essential-info';
import { ListItemsGrid } from './components/list-items-grid/list-items-grid';
import { AddItemsButton } from './components/add-items-button/add-items-button';

interface IListDetailsProps {
    listId: number;
    isEditable: boolean;
}

export const ListDetails: FC<IListDetailsProps> = (props) => {
    const { listId, isEditable } = props;
    const { user } = useUser();
    const userLang = user ? user.iso_639_1 : 'en-US';

    const getPromiseForInfiniteScroll = (page: number) => {
        return ListsPromises.getListDetails(listId, page, userLang);
    };

    const { data, isPending, error } = useInfiniteScroll<IListDetailsWithoutPageDependingData, IMediaItem>(
        getPromiseForInfiniteScroll
    );

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    if (data && isPending)
        return (
            <>
                <EssentialInfo list={data} isPending={false} isEditable={isEditable} listId={listId.toString()} />
                <ListItemsGrid isPending={false} items={data?.results} comments={data?.comments} />
                <>loader</>
            </>
        );

    return (
        <>
            <EssentialInfo list={data} isPending={isPending} isEditable={isEditable} listId={listId.toString()} />
            <ListItemsGrid isPending={isPending} items={data?.results} comments={data?.comments} />
            <AddItemsButton />
        </>
    );
};

// todo
// sorting dropdown menu
// grid template to even for better infinite scroll experiance
// <>loader</>
// return testing
