import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './nav-menu.module.scss';

export const NavMenu: FC = () => {
    const { pathname } = useLocation();

    const baseUrl = pathname.split('edit')[0] + 'edit';
    const itemsUrl = `${baseUrl}/items`;
    const deleteUrl = `${baseUrl}/delete`;

    return (
        <ul className={styles.wrapper}>
            <div>Edit</div>
            <li>
                <NavLink
                    to={baseUrl}
                    className={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}
                    end
                >
                    List Info
                </NavLink>
            </li>
            <li>
                <NavLink to={itemsUrl} className={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}>
                    List Items
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={deleteUrl}
                    className={({ isActive }) => (isActive ? styles.activeNavLink : styles.navLink)}
                >
                    Delete List
                </NavLink>
            </li>
        </ul>
    );
};

// todo
// remake navigation menus using NavLink for other index pages
