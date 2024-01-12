import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useSession, useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { IListDetails } from '../../configs/interfaces/lists.interfaces';
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
    const { sessionId } = useSession();
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [list, setList] = useState<IListDetails>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        getInitialListData();
    }, []);

    const getInitialListData = async () => {
        const userLang = user ? user.iso_639_1 : 'en-US';
        const data = await requestWithNotificationsAndPendingSetter(
            dispatch,
            ListsPromises.getListDetails(listId, 1, userLang),
            setIsPending,
            false,
            undefined,
            setError
        );
        if (data) {
            setList(data);
        }
    };

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    return (
        <>
            <EssentialInfo list={list} isPending={isPending} isEditable={isEditable} listId={listId.toString()} />
            <ListItemsGrid isPending={isPending} items={list?.results} comments={list?.comments} />
            <AddItemsButton />
        </>
    );
};

// todo
// check if infinite scroll required
// sorting dropdown menu
