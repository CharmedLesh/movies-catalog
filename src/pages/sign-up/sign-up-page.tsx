import { FC } from 'react';
import { SignUpForm } from './components/sign-up-form/sign-up-form';
import styles from './sign-up-page.module.scss';

export const SignUpPage: FC = () => {
    return (
        <div className={styles.signUpPage}>
            <SignUpForm />
        </div>
    );
};
