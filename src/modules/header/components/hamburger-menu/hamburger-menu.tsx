import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './hamburger-menu.module.scss';

interface IHamburgerMenuProps {
    isHamburgerMenuToggled: boolean;
}

export const HamburgerMenu: FC<IHamburgerMenuProps> = (props) => {
    const { isHamburgerMenuToggled } = props;

    const hamburgerMenuClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerMenu} ${styles.hamburgerMenuToggled}`
        : styles.hamburgerMenu;

    return (
        <ul className={hamburgerMenuClassName}>
            <ul>
                <li>
                    <Link to="/movies-catalog/trending">Trending</Link>
                </li>
                <li>
                    <Link to="/movies-catalog/popular">Popular</Link>
                </li>
                <li>
                    <Link to="/movies-catalog/about">About</Link>
                </li>
                <li>
                    <Link to="/movies-catalog/contact">Contact</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/movies-catalog/sign-in">Sign In</Link>
                </li>
                <li>
                    <Link to="/movies-catalog/sign-up">Sign Up</Link>
                </li>
            </ul>
        </ul>
    );
};
