import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabMenu } from '../../../../ui/menus';

type TabsType = 'overview' | 'favorite' | 'rated' | 'watchlist' | 'lists';
type SubTabsType = 'movies' | 'tv';

interface ISubmenuProps {
    selectedTab: TabsType;
    selectedSubTab: SubTabsType;
    setSelectedSubTab: React.Dispatch<React.SetStateAction<SubTabsType>>;
}

export const Submenu: FC<ISubmenuProps> = (props) => {
    const { selectedTab, selectedSubTab, setSelectedSubTab } = props;
    const navigate = useNavigate();

    const onChangeHandler = (subtab: SubTabsType) => {
        setSelectedSubTab(subtab);
        navigate(`/account/${selectedTab}/${selectedSubTab}`);
    };

    const subMenuTabsDataArray = [
        {
            labelText: 'Movies',
            inputValue: 'movies',
            isChecked: selectedSubTab === 'movies',
            onChange: () => onChangeHandler('movies')
        },
        {
            labelText: 'TV',
            inputValue: 'tv',
            isChecked: selectedSubTab === 'tv',
            onChange: () => onChangeHandler('tv')
        }
    ];

    return <TabMenu tabDataArray={subMenuTabsDataArray} />;
};
