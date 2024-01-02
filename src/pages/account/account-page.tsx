import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menus } from './components/menus/menus';
import styles from './account-page.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const AccountPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const page = location.pathname.split('/')[2] as TabsType;
    const subpage = location.pathname.split('/')[3] as SubTabsType;

    // redirect if user tries to access /account
    useEffect(() => {
        if (location.pathname === '/account') {
            navigate('/account/overview');
        }
    }, []);

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
