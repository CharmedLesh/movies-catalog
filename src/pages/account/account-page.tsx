import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menus } from './components/menus/menus';
import styles from './account-page.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const AccountPage: FC = () => {
    const navigate = useNavigate();

    const getTabStateByPathname = () => {
        switch (window.location.pathname) {
            case '/account/overview':
                return 'overview';
            case '/account/lists':
                return 'lists';
            case '/account/watchlist/movies':
            case '/account/watchlist/tv':
            case '/account/watchlist':
                return 'watchlist';
            case '/account/rated/movies':
            case '/account/rated/tv':
            case '/account/rated':
                return 'rated';
            case '/account/favorite/movies':
            case '/account/favorite/tv':
            case '/account/favorite':
                return 'favorite';
            default:
                return 'overview';
        }
    };

    const getSubTabStateByPathname = () => {
        switch (window.location.pathname) {
            case '/account/watchlist/movies':
            case '/account/rated/movies':
            case '/account/favorite/movies':
                return 'movies';
            case '/account/watchlist/tv':
            case '/account/rated/tv':
            case '/account/favorite/tv':
                return 'tv';
            default:
                return 'movies';
        }
    };

    const [selectedTab, setSelectedTab] = useState<TabsType>(getTabStateByPathname());
    const [selectedSubTab, setSelectedSubTab] = useState<SubTabsType>(getSubTabStateByPathname());

    // redirect if user tries to access /account
    useEffect(() => {
        if (window.location.pathname === '/account') {
            navigate('/account/overview');
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Menus
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    selectedSubTab={selectedSubTab}
                    setSelectedSubTab={setSelectedSubTab}
                />
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
