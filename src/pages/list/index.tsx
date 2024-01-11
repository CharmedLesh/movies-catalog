import { FC } from 'react';
import { ListDetails } from '../../modules';
import styles from './index.module.scss';

export const ListPage: FC = () => {
    const listId = Number(window.location.pathname.split('/')[2]);

    return (
        <div className={styles.wrapper}>
            <ListDetails listId={listId} isEditable={false} />
        </div>
    );
};
