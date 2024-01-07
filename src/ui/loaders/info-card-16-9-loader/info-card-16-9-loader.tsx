import { FC } from 'react';
import styles from './info-card-16-9-loader.module.scss';

export const InfoCard169Loader: FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.infoPanel} />
        </div>
    );
};
