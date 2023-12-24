import { FC } from 'react';
import styles from './tab-menu.module.scss';

interface ITabMenuProps {
    tabDataArray: {
        labelText: string;
        inputValue: string;
        isChecked: boolean;
        onChange: () => void;
    }[];
}

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const { tabDataArray } = props;

    const generateTabs = () => {
        let tabs: JSX.Element[] = [];

        tabDataArray.forEach((tabData, index) => {
            tabs.push(
                <label key={index}>
                    {tabData.labelText}
                    <input
                        type="radio"
                        value={tabData.inputValue}
                        checked={tabData.isChecked}
                        onChange={tabData.onChange}
                    />
                </label>
            );
        });

        return tabs;
    };

    return <form className={styles.tabMenu}>{generateTabs()}</form>;
};
