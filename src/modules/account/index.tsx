import { FC, useEffect, useState } from 'react';
import { OverviewTab } from './components/overview-tab/overview-tab';
import { FavoriteTab } from './components/favorite-tab/favorite-tab';
import { RatedTab } from './components/rated-tab/rated-tab';
import { WatchlistTab } from './components/watchlist-tab/watchlist-tab';
import { ListsTab } from './components/lists-tab/lists-tab';
import { Menu } from './components/menu/menu';
import { Submenu } from './components/submenu/submenu';
import styles from './index.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

export const Account: FC = () => {
    const [selectedTab, setSelectedTab] = useState<TabsType>('overview');
    const [selectedSubTab, setSelectedSubTab] = useState<SubTabsType>('movies');

    return (
        <div className={styles.accountModule}>
            <div className={styles.menusWrapper}>
                <Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {(selectedTab === 'watchlist' || selectedTab === 'rated' || selectedTab === 'favorite') && (
                    <Submenu selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} />
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
