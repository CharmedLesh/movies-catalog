import { FC } from 'react';
import styles from './no-items-banner.module.scss';

export const NoItemsBanner: FC = () => {
    return (
        <div className={styles.wrapper}>
            <p>You haven`t added any items to this list</p>
        </div>
    );
};
