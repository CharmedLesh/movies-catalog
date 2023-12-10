import { FC } from 'react';
import { Auth } from '../../services/auth/auth';
import styles from './home-page.module.scss';

export const HomePage: FC = () => {
    return <div className={styles.homePage}>Home Page</div>;
};
