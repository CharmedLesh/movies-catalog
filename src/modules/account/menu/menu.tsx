import { FC } from 'react';
import styles from './menu.module.scss';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';

interface IMenuProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<TabsType>>;
    selectedTab: TabsType;
}

export const Menu: FC<IMenuProps> = (props) => {
    const { setSelectedTab, selectedTab } = props;

    return (
        <form className={styles.menu}>
            <label>
                Overview
                <input
                    type="radio"
                    value="overview"
                    checked={selectedTab === 'overview'}
                    onChange={() => setSelectedTab('overview')}
                />
            </label>
            <br />
            <label>
                Lists
                <input
                    type="radio"
                    value="lists"
                    checked={selectedTab === 'lists'}
                    onChange={() => setSelectedTab('lists')}
                />
            </label>
            <br />
            <label>
                Watchlist
                <input
                    type="radio"
                    value="watchlist"
                    checked={selectedTab === 'watchlist'}
                    onChange={() => setSelectedTab('watchlist')}
                />
            </label>
            <br />
            <label>
                Rated
                <input
                    type="radio"
                    value="rated"
                    checked={selectedTab === 'rated'}
                    onChange={() => setSelectedTab('rated')}
                />
            </label>
            <br />
            <label>
                Favorite
                <input
                    type="radio"
                    value="favorite"
                    checked={selectedTab === 'favorite'}
                    onChange={() => setSelectedTab('favorite')}
                />
            </label>
            <br />
        </form>
    );
};
