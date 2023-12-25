import { FC, useEffect, useState } from 'react';
import { IListsCollection } from '../../../../configs/interfaces/media-lists.interfaces';
import { Logger } from '../../../../services/logger/logger';
import { useUser } from '../../../../services/hooks/store-hooks';
import { simpleRequest } from '../../../../helpers/simple-request';
import { ListsPromises } from '../../../../services/lists/lists-promises';
import { ListCard } from '../list-card/list-card';
import styles from './lists-tab.module.scss';

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

    const generateListsCardsArray = (lists: IListsCollection) => {
        let listsCardsArray: JSX.Element[] = [];
        lists.results.forEach((list) => {
            listsCardsArray.push(<ListCard list={list} />);
        });
        return listsCardsArray;
    };

    return lists ? <div className={styles.wrapper}>{generateListsCardsArray(lists)}</div> : <></>;
};
