import { FC, useEffect, useState } from 'react';
import { IListsCollection } from '../../configs/interfaces/media-lists.interfaces';
import { useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/lists/lists-promises';
import { Logger } from '../../services/logger/logger';
import { simpleRequest } from '../../helpers/simple-request';
import { ListsCardsGrid } from './components/lists-cards-grid/lists-card-grid';

export const AccountLists: FC = () => {
    const { user } = useUser();

    const [lists, setLists] = useState<IListsCollection | null>(null);

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

    return <div>{lists && <ListsCardsGrid lists={lists} />}</div>;
};

// todo
// top-panel
// change pages
// no lists found banner
// error getting data banner
