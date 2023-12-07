import { FC, SyntheticEvent } from 'react';
import { UsernameInput } from '../username-input/username-input';
import { PasswordInput } from '../password-input/password-input';
import { ActionButtonsBlock } from '../action-buttons-block/action-buttons-block';
import styles from './sign-in-form.module.scss';

export const SignInForm: FC = () => {
    const onFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <form className={styles.signInForm}>
            <UsernameInput />
            <PasswordInput />
            <ActionButtonsBlock onClick={onFormSubmit} />
        </form>
    );
};
