import { FC } from 'react';
import { BorderedInput } from '../../../../ui/inputs';
import styles from './username-input.module.scss';

export const UsernameInput: FC = () => {
    return (
        <div className={styles.usernameInputWrapper}>
            <BorderedInput
                useLabel={true}
                labelValue="Username"
                id="sign-up-username-input"
                name="username"
                placeholder="Enter your username here..."
                type="text"
                spellCheck={false}
            />
        </div>
    );
};
