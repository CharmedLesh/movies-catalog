import { FC } from 'react';
import { Menu } from '../menu/menu';
import { Submenu } from '../submenu/submenu';
import styles from './menus.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

interface IMenuProps {
    selectedTab: TabsType;
    selectedSubTab: SubTabsType;
}

export const Menus: FC<IMenuProps> = (props) => {
    const { selectedTab, selectedSubTab } = props;

    return (
        <div className={styles.menus}>
            <Menu selectedTab={selectedTab} />
            {(selectedTab === 'watchlist' || selectedTab === 'rated' || selectedTab === 'favorite') && (
                <Submenu selectedTab={selectedTab} selectedSubTab={selectedSubTab} />
            )}
        </div>
    );
};
