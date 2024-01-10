import { FC } from 'react';
import { TopPanel } from './components/top-panel/top-panel';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

export const AccountListsPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <TopPanel />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};
