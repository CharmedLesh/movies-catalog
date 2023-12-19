import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './hamburger-menu.module.scss';

interface IHamburgerMenuProps {
    isHamburgerMenuToggled: boolean;
    toggleHamburgerMenu: () => void;
}

export const HamburgerMenu: FC<IHamburgerMenuProps> = (props) => {
    const { isHamburgerMenuToggled, toggleHamburgerMenu } = props;

    const hamburgerMenuClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerMenu} ${styles.hamburgerMenuToggled}`
        : styles.hamburgerMenu;

    return (
        <ul className={hamburgerMenuClassName}>
            <ul>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/trending`} onClick={toggleHamburgerMenu}>
                        Trending
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/popular`} onClick={toggleHamburgerMenu}>
                        Popular
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/about`} onClick={toggleHamburgerMenu}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/contact`} onClick={toggleHamburgerMenu}>
                        Contact
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/account`} onClick={toggleHamburgerMenu}>
                        Sign In
                    </Link>
                </li>
            </ul>
        </ul>
    );
};
