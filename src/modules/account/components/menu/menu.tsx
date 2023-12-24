import { FC } from 'react';
import { TabMenu } from '../../../../ui/menus/tab-menu/tab-menu';
// import styles from './menu.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';

interface IMenuProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<TabsType>>;
    selectedTab: TabsType;
}

export const Menu: FC<IMenuProps> = (props) => {
    const { setSelectedTab, selectedTab } = props;

    const menuTabsDataArray = [
        {
            labelText: 'Overview',
            inputValue: 'overview',
            isChecked: selectedTab === 'overview',
            onChange: () => setSelectedTab('overview')
        },
        {
            labelText: 'Lists',
            inputValue: 'lists',
            isChecked: selectedTab === 'lists',
            onChange: () => setSelectedTab('lists')
        },
        {
            labelText: 'Watchlist',
            inputValue: 'watchlist',
            isChecked: selectedTab === 'watchlist',
            onChange: () => setSelectedTab('watchlist')
        },
        {
            labelText: 'Rated',
            inputValue: 'rated',
            isChecked: selectedTab === 'rated',
            onChange: () => setSelectedTab('rated')
        },
        {
            labelText: 'Favorite',
            inputValue: 'favorite',
            isChecked: selectedTab === 'favorite',
            onChange: () => setSelectedTab('favorite')
        }
    ];

    return <TabMenu tabDataArray={menuTabsDataArray} />;
};
