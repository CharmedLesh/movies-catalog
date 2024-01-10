import { FC, useEffect, useState } from 'react';
import { Logger } from '../../services/logger/logger';
import { useAppDispatch, useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { IListDetails } from '../../configs/interfaces/lists.interfaces';
import { ErrorBanner } from '../../components';
import { EssentialInfo } from './components/essential-info/essential-info';
import { ListItemsGrid } from './components/list-items-grid/list-items-grid';
import styles from './index.module.scss';

export const ListDetails: FC = () => {
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [list, setList] = useState<IListDetails>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>();

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
                false,
                undefined,
                setError
            );
            if (data) {
                setList(data);
            }
        } else {
            setIsPending(false);
            Logger.logError('List id not found.');
        }
    };

    if (error) return <ErrorBanner errorDescription={error} errorInfo="Error" />;

    return (
        <div className={styles.wrapper}>
            <EssentialInfo list={list} isPending={isPending} />
            <ListItemsGrid isPending={isPending} items={list?.results} comments={list?.comments} />
        </div>
    );
};
