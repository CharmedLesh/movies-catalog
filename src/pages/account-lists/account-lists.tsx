import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useUser } from '../../services/hooks/store-hooks';
import { IListsCollection } from '../../configs/interfaces/media-lists.interfaces';
import { ListsPromises } from '../../services/lists/lists-promises';
import { Logger } from '../../services/logger/logger';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { TopPanel } from './components/top-panel/top-panel';
import { CreateListForm } from './components/create-list-form/create-list-form';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-card-grid';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';

export const AccountListsPage: FC = () => {
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [lists, setLists] = useState<IListsCollection | null>(null);
    const [isCreateListFormOpen, setIsCreateListFormOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        getInitialListsState();
    }, []);

    const getInitialListsState = async () => {
        // todo
        // try to do request with session id (often error on getting user on page reload)
        if (user?.id) {
            const data = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.getListsCollection(user.id.toString(), 1),
                setIsPending,
                false
            );
            if (data) {
                setLists(data);
            }
        } else {
            Logger.logError('User id not found');
        }
    };

    return (
        <>
            <TopPanel setIsCreateListFormOpen={setIsCreateListFormOpen} isCreateListFormOpen={isCreateListFormOpen} />
            {isCreateListFormOpen ? (
                // todo
                // create list form to separate page
                <CreateListForm />
            ) : !lists?.results.length && !isPending ? (
                <NoListsBanner />
            ) : (
                <ListsCardsGrid lists={lists?.results ? lists.results : []} isPending={isPending} />
            )}
        </>
    );
};
