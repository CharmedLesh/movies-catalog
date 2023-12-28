import { FC, useEffect, useState } from 'react';
import { useUser } from '../../services/hooks/store-hooks';
import { IListsCollection } from '../../configs/interfaces/media-lists.interfaces';
import { ListsPromises } from '../../services/lists/lists-promises';
import { Logger } from '../../services/logger/logger';
import { simpleRequest } from '../../helpers/simple-request';
import { TopPanel } from './components/top-panel/top-panel';
import { CreateListForm } from './components/create-list-form/create-list-form';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-card-grid';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';

export const AccountListsPage: FC = () => {
    const { user } = useUser();

    const [lists, setLists] = useState<IListsCollection | null>(null);
    const [isCreateListFormOpen, setIsCreateListFormOpen] = useState<boolean>(false);

    useEffect(() => {
        getInitialListsState();
    }, []);

    const getInitialListsState = async () => {
        if (user?.id) {
            // todo
            // simple request to request with notification
            const data = await simpleRequest(ListsPromises.getListsCollection(user.id.toString(), 1));
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
                <CreateListForm />
            ) : lists?.results.length ? (
                <ListsCardsGrid lists={lists.results} />
            ) : (
                <NoListsBanner />
            )}
        </>
    );
};
