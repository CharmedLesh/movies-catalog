import { FC } from 'react';
import { BorderedInput } from '../../../../ui/inputs';
// import styles from './username-input.module.scss';

export const EmailInput: FC = () => {
    return (
        // <div className={styles.usernameInputWrapper}>
        <BorderedInput
            useLabel={true}
            labelValue="Email"
            id="sign-up-email-input"
            name="email"
            placeholder="Enter your email here..."
            type="email"
        />
        // </div>
    );
};
