import { FC } from 'react';
import { Link } from 'react-router-dom';
import tmdbLogo from '../../../../ui/images/tmdb-primary-long-logo.svg';
import styles from './tmdb-credit.module.scss';

export const TmbdCredit: FC = () => {
    return (
        <Link to="https://www.themoviedb.org" target="_blank" type="credit" className={styles.tmdbCredit}>
            <img src={tmdbLogo} />
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </Link>
    );
};
