import { FC } from 'react';
import { TabMenu } from '../../../../ui/menus/tab-menu/tab-menu';
// import styles from './submenu.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

interface ISubmenuProps {
    selectedSubTab: SubTabsType;
    setSelectedSubTab: React.Dispatch<React.SetStateAction<SubTabsType>>;
    selectedTab: TabsType;
}

export const Submenu: FC<ISubmenuProps> = (props) => {
    const { selectedSubTab, setSelectedSubTab, selectedTab } = props;

    const subMenuTabsDataArray = [
        {
            labelText: 'Movies',
            inputValue: 'movies',
            isChecked: selectedSubTab === 'movies',
            onChange: () => setSelectedSubTab('movies')
        },
        {
            labelText: 'TV',
            inputValue: 'tv',
            isChecked: selectedSubTab === 'tv',
            onChange: () => setSelectedSubTab('tv')
        }
    ];

    return <TabMenu tabDataArray={subMenuTabsDataArray} />;
};
