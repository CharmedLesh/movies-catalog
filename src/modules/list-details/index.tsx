import { FC, useEffect, useState } from 'react';
import { Logger } from '../../services/logger/logger';
import { useAppDispatch, useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/lists/lists-promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { IListDetails } from '../../configs/interfaces/media-lists.interfaces';
import { ErrorBanner } from '../../components';
import { EssentialInfo } from './components/essential-info/essential-info';
import styles from './index.module.scss';

export const ListDetails: FC = () => {
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [list, setList] = useState<IListDetails>();
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        getInitialListData();
    }, []);

    const getInitialListData = async () => {
        const listId = Number(window.location.pathname.split('/')[3]);

        if (listId) {
            const data = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.getListDetails(listId, 1, user?.iso_639_1),
                setIsPending,
                false
            );
            if (data) {
                setList(data);
            }
        } else {
            setIsPending(false);
            Logger.logError('List id not found.');
        }
    };

    return (
        <div className={styles.wrapper}>
            {!isPending && !list ? (
                <ErrorBanner errorDescription="No data found for requested list" errorInfo="Not Found" />
            ) : (
                <EssentialInfo list={list} isPending={isPending} />
            )}
        </div>
    );
};
