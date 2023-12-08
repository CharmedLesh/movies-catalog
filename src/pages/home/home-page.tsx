import { FC, useEffect } from 'react';
import styles from './home-page.module.scss';
import { Auth } from '../../services/auth/auth';

export const HomePage: FC = () => {
    useEffect(() => {
        Auth.createRequestToken();
    }, []);

    return <div className={styles.homePage}>Home Page</div>;
};
