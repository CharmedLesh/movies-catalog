import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menus } from './components/menus/menus';
import styles from './account-page.module.scss';

type TabsType = undefined | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const AccountPage: FC = () => {
    const location = useLocation();

    const page = location.pathname.split('/')[2] as TabsType;
    const subpage = location.pathname.split('/')[3] as SubTabsType;

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Menus selectedTab={page} selectedSubTab={subpage} />
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
