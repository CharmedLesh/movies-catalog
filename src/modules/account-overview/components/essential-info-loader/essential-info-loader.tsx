import { FC } from 'react';
import { Spinner } from '../../../../ui/loaders';
import styles from './essential-info-loader.module.scss';

export const EssentialInfoLoader: FC = () => {
    return (
        <div className={styles.loader}>
            <Spinner />
        </div>
    );
};
