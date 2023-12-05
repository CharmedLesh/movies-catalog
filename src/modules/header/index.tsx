import { FC } from 'react';
import { Link } from 'react-router-dom';
import tmdbLogo from '../../ui/images/tmdb-primary-long-logo.svg';
import logo from '../../ui/images/logo.png';
import styles from './index.module.scss';

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
                <img src={logo} className={styles.logo} />
            </div>
        </header>
    );
};
