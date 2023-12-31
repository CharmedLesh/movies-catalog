import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabMenu } from '../../../../ui/menus';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

interface IMenuProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<TabsType>>;
    selectedTab: TabsType;
    selectedSubTab: SubTabsType;
}

export const Menu: FC<IMenuProps> = (props) => {
    const { setSelectedTab, selectedTab, selectedSubTab } = props;
    const navigate = useNavigate();

    const onChangeHandler = (tab: TabsType) => {
        setSelectedTab(tab);
        if (tab === 'overview' || tab === 'lists') {
            navigate(`/account/${tab}`);
        } else {
            navigate(`/account/${tab}/${selectedSubTab}`);
        }
    };

    const menuTabsDataArray = [
        {
            labelText: 'Overview',
            inputValue: 'overview',
            isChecked: selectedTab === 'overview',
            onChange: () => onChangeHandler('overview')
        },
        {
            labelText: 'Lists',
            inputValue: 'lists',
            isChecked: selectedTab === 'lists',
            onChange: () => onChangeHandler('lists')
        },
        {
            labelText: 'Watchlist',
            inputValue: 'watchlist',
            isChecked: selectedTab === 'watchlist',
            onChange: () => onChangeHandler('watchlist')
        },
        {
            labelText: 'Rated',
            inputValue: 'rated',
            isChecked: selectedTab === 'rated',
            onChange: () => onChangeHandler('rated')
        },
        {
            labelText: 'Favorite',
            inputValue: 'favorite',
            isChecked: selectedTab === 'favorite',
            onChange: () => onChangeHandler('favorite')
        }
    ];

    return <TabMenu tabDataArray={menuTabsDataArray} />;
};
