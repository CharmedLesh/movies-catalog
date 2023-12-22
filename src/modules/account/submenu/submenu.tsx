import { FC } from 'react';
import styles from './submenu.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv' | 'episodes';

interface ISubmenuProps {
    selectedSubTab: SubTabsType;
    setSelectedSubTab: React.Dispatch<React.SetStateAction<SubTabsType>>;
    selectedTab: TabsType;
}

export const Submenu: FC<ISubmenuProps> = (props) => {
    const { selectedSubTab, setSelectedSubTab, selectedTab } = props;

    return (
        <form className={styles.subMenu}>
            <label>
                Movies
                <input
                    type="radio"
                    value="movies"
                    checked={selectedSubTab === 'movies'}
                    onChange={() => setSelectedSubTab('movies')}
                />
            </label>
            <label>
                TV
                <input
                    type="radio"
                    value="tv"
                    checked={selectedSubTab === 'tv'}
                    onChange={() => setSelectedSubTab('tv')}
                />
            </label>
            {selectedTab === 'rated' && (
                <label>
                    Episodes
                    <input
                        type="radio"
                        value="episodes"
                        checked={selectedSubTab === 'episodes'}
                        onChange={() => setSelectedSubTab('episodes')}
                    />
                </label>
            )}
        </form>
    );
};
