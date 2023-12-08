import { FC, SyntheticEvent } from 'react';
import { UsernameInput } from '../username-input/username-input';
import { PasswordInput } from '../password-input/password-input';
import { EmailInput } from '../email-input/email-input';
import { SubmitButton } from '../submit-button/submit-button';
import styles from './sign-up-form.module.scss';

export const SignUpForm: FC = () => {
    const onFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <form className={styles.signUpForm}>
            <EmailInput />
            <UsernameInput />
            <PasswordInput
                labelValue="Password"
                name="password"
                id="sign-up-password-input"
                placeholder="Enter your password here..."
            />
            <PasswordInput
                labelValue="Password Confirmation"
                name="password-confirmation"
                id="sign-up-password-confirmation-input"
                placeholder="Confirm your password here..."
            />
            <SubmitButton onClick={onFormSubmit} />
        </form>
    );
};
