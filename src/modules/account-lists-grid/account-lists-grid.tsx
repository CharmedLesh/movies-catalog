import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useSessionId } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/lists/lists-promises';
import { Logger } from '../../services/logger/logger';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { NoListsBanner } from './components/no-lists-banner/no-lists-banner';
import { ListCard } from './components/list-card/list-card';
import { InfoCard169Loader } from '../../ui/loaders';
import { IListGeneralInfo, IListsCollection } from '../../configs/interfaces/media-lists.interfaces';
import styles from './account-lists-grid.module.scss';

export const AccountListsGrid: FC = () => {
    const { sessionId } = useSessionId();
    const dispatch = useAppDispatch();

    const [lists, setLists] = useState<IListsCollection | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        getInitialListsState();
    }, []);

    const getInitialListsState = async () => {
        if (sessionId) {
            const data = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.getListsCollection(sessionId, 1),
                setIsPending,
                false
            );
            if (data) {
                setLists(data);
            }
        } else {
            Logger.logError('Session id not found');
        }
    };

    const generateListsCardsArray = (lists: IListGeneralInfo[]) => {
        let listsCardsArray: JSX.Element[] = [];
        lists.forEach((list, index) => {
            listsCardsArray.push(<ListCard list={list} key={index} />);
        });
        return listsCardsArray;
    };

    return (
        <div className={styles.grid}>
            {isPending ? (
                <InfoCard169Loader />
            ) : lists?.results ? (
                generateListsCardsArray(lists.results)
            ) : (
                <NoListsBanner />
            )}
        </div>
    );
};
