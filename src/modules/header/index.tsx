import { FC } from 'react';
import { Link } from 'react-router-dom';
import tmdbLogo from '../../ui/images/tmdb-primary-long-logo.svg';
import styles from './index.module.scss';
import { SvgClapperboardIcon } from '../../ui/icons';

export const HeaderModule: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.creditsContainer}>
                <Link to="https://www.themoviedb.org" target="_blank" type="credit" className={styles.tmdbCredit}>
                    <img src={tmdbLogo} />
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                </Link>
            </div>
            <div className={styles.bottomContainer}>
                <input id="hamburger-toggle" className={styles.hamburgerToggle} type="checkbox" />
                <label className={styles.hamburgerButtonContainer} htmlFor="hamburger-toggle">
                    <div className={styles.hamburgerButton}></div>
                </label>
                <SvgClapperboardIcon className={styles.logo} />
            </div>
            <ul className={styles.menu}>
                <ul className={styles.menuOptions}>
                    <li>Trending</li>
                    <li>Popular</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <ul className={styles.authOptions}>
                    <li>Sign In</li>
                    <li>Sign Up</li>
                </ul>
            </ul>
        </header>
    );
};
