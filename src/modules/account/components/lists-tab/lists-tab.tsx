import { FC, useEffect, useState } from 'react';
import { IListsCollection } from '../../../../configs/interfaces/media-lists.interfaces';
import { Logger } from '../../../../services/logger/logger';
import { useUser } from '../../../../services/hooks/store-hooks';
import { simpleRequest } from '../../../../helpers/simple-request';
import { ListsPromises } from '../../../../services/lists/lists-promises';

export const ListsTab: FC = () => {
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

    return <div>{JSON.stringify(lists?.results)}</div>;
};
