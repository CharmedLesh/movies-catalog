import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Menus } from './components/menus/menus';
import styles from './index.module.scss';

export const AccountPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Menus />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};
