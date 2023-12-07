import { FC } from 'react';
import { BorderedInput } from '../../../../ui/inputs';
import styles from './username-input.module.scss';

export const UsernameInput: FC = () => {
    return (
        <div className={styles.usernameInputWrapper}>
            <BorderedInput
                useLabel={true}
                labelValue="Username"
                id="sign-in-username-input"
                placeholder="Enter your username here..."
                type="text"
            />
        </div>
    );
};
