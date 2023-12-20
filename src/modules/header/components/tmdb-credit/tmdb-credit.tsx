import { FC } from 'react';
import { Link } from 'react-router-dom';
import tmdbLogo from '../../../../ui/images/tmdb-primary-long-logo.svg';
import externalLinksData from '../../../../configs/external-links.json';
import styles from './tmdb-credit.module.scss';

export const TmdbCredit: FC = () => {
    return (
        <Link
            to={externalLinksData.tmdb.url}
            title={externalLinksData.tmdb.title}
            rel={externalLinksData.tmdb.rel}
            target="_blank"
            type="credit"
            className={styles.tmdbCredit}
        >
            <img src={tmdbLogo} alt="TMDB logo" />
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </Link>
    );
};
