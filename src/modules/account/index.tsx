import { FC, useState } from 'react';
import { useUser } from '../../services/hooks/store-hooks';
import { OverviewTab } from './overview-tab/overview-tab';
import { FavoriteTab } from './favorite-tab/favorite-tab';
import { RatedTab } from './rated-tab/rated-tab';
import { WatchlistTab } from './watchlist-tab/watchlist-tab';
import { ListsTab } from './lists-tab/lists-tab';
import { Menu } from './menu/menu';
import styles from './index.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';

export const Account: FC = () => {
    const { user } = useUser();

    const [selectedTab, setSelectedTab] = useState<TabsType>('overview');

    return (
        <div className={styles.accountModule}>
            <div>
                <Menu setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
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
