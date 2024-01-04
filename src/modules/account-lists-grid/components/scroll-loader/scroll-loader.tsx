import { FC } from 'react';
import { SquareAccent } from '../../../../ui/loaders';
import styles from './scroll-loader.module.scss';

export const ScrollLoader: FC = () => {
    return (
        <div className={styles.scrollLoader}>
            <SquareAccent />
        </div>
    );
};
