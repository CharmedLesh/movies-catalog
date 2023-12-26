import { FC } from 'react';
import styles from './no-lists-banner.module.scss';

export const NoListsBanner: FC = () => {
    return <div className={styles.wrapper}>You haven`t created any lists.</div>;
};
