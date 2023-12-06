import { FC } from 'react';
import styles from './copyright.module.scss';

export const Copyright: FC = () => {
    return <p className={styles.copyright}>&copy;Copyright text</p>;
};
