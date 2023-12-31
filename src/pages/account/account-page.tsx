import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menus } from './components/menus/menus';
import styles from './account-page.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const AccountPage: FC = () => {
    const navigate = useNavigate();

    const getTabStateByPathname = () => {
        const pathParts = window.location.pathname.split('/');

        switch (pathParts[2]) {
            case 'overview':
                return 'overview';
            case 'lists':
                return 'lists';
            case 'watchlist':
                return 'watchlist';
            case 'rated':
                return 'rated';
            case 'favorite':
                return 'favorite';
            default:
                return 'overview';
        }
    };

    const getSubTabStateByPathname = () => {
        const pathParts = window.location.pathname.split('/');

        switch (pathParts[3]) {
            case 'movies':
                return 'movies';
            case 'tv':
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
