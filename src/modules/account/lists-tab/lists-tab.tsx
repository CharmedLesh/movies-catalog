import { FC, useEffect, useState } from 'react';
import { IMediaList } from '../../../configs/interfaces/media-lists.interfaces';
import { AccountPromises } from '../../../services/account/account-promises';
import { Logger } from '../../../services/logger/logger';
import { useUser } from '../../../services/hooks/store-hooks';
import { simpleRequest } from '../../../helpers/simple-request';

export const ListsTab: FC = () => {
    const { user } = useUser();

    const [lists, setLists] = useState<IMediaList | null>(null);

    useEffect(() => {
        getInitialListsState();
    }, []);

    const getInitialListsState = async () => {
        if (user?.id) {
            const data = await simpleRequest(AccountPromises.getLists(user.id.toString(), 1));
            if (data) {
                setLists(data);
            }
        } else {
            Logger.logError('User id not found');
        }
    };

    return <div>{JSON.stringify(lists?.results)}</div>;
};
