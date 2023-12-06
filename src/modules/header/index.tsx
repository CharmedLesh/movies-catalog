import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbLogo from '../../ui/images/tmdb-primary-long-logo.svg';
import styles from './index.module.scss';
import { SvgClapperboardIcon } from '../../ui/icons';

export const HeaderModule: FC = () => {
    const [isHamburgerMenuToggled, setHamburgerMenuToggled] = useState<boolean>(false);

    const toggleHamburgerMenu = () => {
        setHamburgerMenuToggled((prevState) => !prevState);
    };

    const hamburgerButtonClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerButton} ${styles.hamburgerButtonToggled}`
        : styles.hamburgerButton;

    const menuClassName = isHamburgerMenuToggled ? `${styles.menu} ${styles.menuToggled}` : styles.menu;

    return (
        <header className={styles.header}>
            <div className={styles.creditsContainer}>
                <Link to="https://www.themoviedb.org" target="_blank" type="credit" className={styles.tmdbCredit}>
                    <img src={tmdbLogo} />
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                </Link>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.hamburgerButtonContainer} onClick={toggleHamburgerMenu}>
                    <button className={hamburgerButtonClassName}></button>
                </div>
                <SvgClapperboardIcon className={styles.logo} />
            </div>
            <ul className={menuClassName}>
                <ul>
                    <li>
                        <Link to="/trending">Trending</Link>
                    </li>
                    <li>
                        <Link to="/popular">Popular</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/sign-in">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/sign-up">Sign Up</Link>
                    </li>
                </ul>
            </ul>
        </header>
    );
};
