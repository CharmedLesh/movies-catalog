import { FC } from 'react';
import { AccountLists, AccountOverview } from '../../../../modules';
import styles from './tabs.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';

interface ITabsProps {
    selectedTab: TabsType;
}

export const Tabs: FC<ITabsProps> = (props) => {
    const { selectedTab } = props;

    return (
        <div className={styles.tabs}>
            {selectedTab === 'overview' && <AccountOverview />}
            {selectedTab === 'lists' && <AccountLists />}
        </div>
    );
};
