import { FC } from 'react';
import { TabMenu } from '../../../../ui/menus';

type SubTabsType = 'movies' | 'tv';

interface ISubmenuProps {
    selectedSubTab: SubTabsType;
    setSelectedSubTab: React.Dispatch<React.SetStateAction<SubTabsType>>;
}

export const Submenu: FC<ISubmenuProps> = (props) => {
    const { selectedSubTab, setSelectedSubTab } = props;

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
