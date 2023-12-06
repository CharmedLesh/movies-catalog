import { FC } from 'react';
import { TmbdCredit } from '../tmdb-credit/tmdb-credit';
import styles from './credits.module.scss';

export const Credits: FC = () => {
    return (
        <div className={styles.credits}>
            <TmbdCredit />
        </div>
    );
};
