import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './tab-menu.module.scss';

interface ITabMenuProps {
    tabDataArray: {
        text: string;
        url: string;
        isEnd: boolean;
    }[];
}

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const { tabDataArray } = props;

    const generateTabs = () => {
        let tabs: JSX.Element[] = [];

        tabDataArray.forEach((tabData, index) => {
            tabs.push(
                <li key={index}>
                    <NavLink
                        to={tabData.url}
                        end={tabData.isEnd}
                        className={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}
                        aria-disabled
                    >
                        {tabData.text}
                    </NavLink>
                </li>
            );
        });

        return tabs;
    };

    return <ul className={styles.wrapper}>{generateTabs()}</ul>;
};
