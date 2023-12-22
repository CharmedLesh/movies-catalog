import { FC, useEffect, useState } from 'react';
import { OverviewTab } from './overview-tab/overview-tab';
import { FavoriteTab } from './favorite-tab/favorite-tab';
import { RatedTab } from './rated-tab/rated-tab';
import { WatchlistTab } from './watchlist-tab/watchlist-tab';
import { ListsTab } from './lists-tab/lists-tab';
import { Menu } from './menu/menu';
import { Submenu } from './submenu/submenu';
import styles from './index.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv' | 'episodes';

export const Account: FC = () => {
    const [selectedTab, setSelectedTab] = useState<TabsType>('overview');
    const [selectedSubTab, setSelectedSubTab] = useState<SubTabsType>('movies');

    useEffect(() => {
        setSelectedSubTab('movies');
    }, [selectedTab]);

    return (
        <div className={styles.accountModule}>
            <div className={styles.menusWrapper}>
                <Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {(selectedTab === 'watchlist' || selectedTab === 'rated' || selectedTab === 'favorite') && (
                    <Submenu
                        selectedSubTab={selectedSubTab}
                        setSelectedSubTab={setSelectedSubTab}
                        selectedTab={selectedTab}
                    />
                )}
            </div>
            <div className={styles.tabWrapper}>
                {selectedTab === 'overview' && <OverviewTab />}
                {selectedTab === 'favorite' && <FavoriteTab />}
                {selectedTab === 'rated' && <RatedTab />}
                {selectedTab === 'watchlist' && <WatchlistTab />}
                {selectedTab === 'lists' && <ListsTab />}
            </div>
        </div>
    );
};
