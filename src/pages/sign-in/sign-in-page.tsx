import { FC } from 'react';
import { SignInForm } from './components/sign-in-form/sign-in-form';
import styles from './sign-in-page.module.scss';

export const SignInPage: FC = () => {
    return (
        <div className={styles.signInPage}>
            <SignInForm />
        </div>
    );
};
