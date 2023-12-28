import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSessionId } from '../../services/hooks/store-hooks';
import { Menus } from './components/menus/menus';
import styles from './account-page.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const AccountPage: FC = () => {
    const navigate = useNavigate();
    const { isSessionId } = useSessionId();

    const [selectedTab, setSelectedTab] = useState<TabsType>('overview');
    const [selectedSubTab, setSelectedSubTab] = useState<SubTabsType>('movies');

    // check if user authorized
    // redirect if user tries to access /account
    // set initial selected tab and subtub
    useEffect(() => {
        if (!isSessionId) {
            navigate('/sign-in');
        }
        switch (window.location.pathname) {
            case '/account':
                navigate('/account/overview');
                break;
            case '/account/overview':
                setSelectedTab('overview');
                break;
            case '/account/lists':
                setSelectedTab('lists');
                break;
            case '/account/watchlist/movies':
                setSelectedTab('watchlist');
                setSelectedSubTab('movies');
                break;
            case '/account/watchlist/tv':
                setSelectedTab('watchlist');
                setSelectedSubTab('tv');
                break;
            case '/account/rated/movies':
                setSelectedTab('rated');
                setSelectedSubTab('movies');
                break;
            case '/account/rated/tv':
                setSelectedTab('rated');
                setSelectedSubTab('tv');
                break;
            case '/account/favorite/movies':
                setSelectedTab('favorite');
                setSelectedSubTab('movies');
                break;
            case '/account/favorite/tv':
                setSelectedTab('favorite');
                setSelectedSubTab('tv');
                break;
            default:
                break;
        }
    }, []);

    // redirect on tab change
    useEffect(() => {
        if (selectedTab === 'overview' || selectedTab === 'lists') {
            navigate(`/account/${selectedTab}`);
        } else {
            navigate(`/account/${selectedTab}/${selectedSubTab}`);
        }
    }, [selectedTab, selectedSubTab]);

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
