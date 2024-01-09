import { FC } from 'react';
import { SignIn } from '../../modules';
import styles from './index.module.scss';

export const SignInPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <SignIn />
        </div>
    );
};
