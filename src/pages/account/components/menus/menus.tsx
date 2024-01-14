import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from '../menu/menu';
import { Submenu } from '../submenu/submenu';
import styles from './menus.module.scss';

export const Menus: FC = () => {
    const { pathname } = useLocation();

    const parts = pathname.split('/');

    return (
        <div className={styles.menus}>
            <Menu />
            {(parts[2] === 'watchlist' || parts[2] === 'rated' || parts[2] === 'favorite') && <Submenu />}
        </div>
    );
};
