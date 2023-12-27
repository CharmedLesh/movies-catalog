import { FC, useEffect, useState } from 'react';
import { IListsCollection } from '../../configs/interfaces/media-lists.interfaces';
import { useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/lists/lists-promises';
import { Logger } from '../../services/logger/logger';
import { simpleRequest } from '../../helpers/simple-request';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-card-grid';
import { TopPanel } from './components/top-panel/top-panel';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';
import { CreateListForm } from './components/create-list-form/create-list-form';

export const AccountLists: FC = () => {
    const { user } = useUser();

    const [lists, setLists] = useState<IListsCollection | null>(null);
    const [isCreateListFormOpen, setIsCreateListFormOpen] = useState<boolean>(false);

    useEffect(() => {
        getInitialListsState();
    }, []);

    const getInitialListsState = async () => {
        if (user?.id) {
            const data = await simpleRequest(ListsPromises.getListsCollection(user.id.toString(), 1));
            if (data) {
                setLists(data);
            }
        } else {
            Logger.logError('User id not found');
        }
    };

    return (
        <div>
            <TopPanel setIsCreateListFormOpen={setIsCreateListFormOpen} isCreateListFormOpen={isCreateListFormOpen} />
            {isCreateListFormOpen ? (
                <CreateListForm />
            ) : lists?.results.length ? (
                <ListsCardsGrid lists={lists.results} />
            ) : (
                <NoListsBanner />
            )}
        </div>
    );
};

// todo
// change pages
// error getting data banner
