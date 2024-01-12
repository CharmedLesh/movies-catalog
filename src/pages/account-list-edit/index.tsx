import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from './components/nav-menu/nav-menu';
import styles from './index.module.scss';

export const AccountListEditPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <NavMenu />
            <Outlet />
        </div>
    );
};
