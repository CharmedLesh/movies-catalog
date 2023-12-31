import { FC } from 'react';
import { Menu } from '../menu/menu';
import { Submenu } from '../submenu/submenu';
import styles from './menus.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

interface IMenuProps {
    selectedTab: TabsType;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabsType>>;
    selectedSubTab: SubTabsType;
    setSelectedSubTab: React.Dispatch<React.SetStateAction<SubTabsType>>;
}

export const Menus: FC<IMenuProps> = (props) => {
    const { selectedTab, setSelectedTab, selectedSubTab, setSelectedSubTab } = props;

    return (
        <div className={styles.menus}>
            <Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} selectedSubTab={selectedSubTab} />
            {(selectedTab === 'watchlist' || selectedTab === 'rated' || selectedTab === 'favorite') && (
                <Submenu
                    selectedTab={selectedTab}
                    selectedSubTab={selectedSubTab}
                    setSelectedSubTab={setSelectedSubTab}
                />
            )}
        </div>
    );
};
