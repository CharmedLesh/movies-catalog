import { FC, SyntheticEvent } from 'react';
import { SlightlyRoundedInput } from '../../ui/inputs/slightly-rounded-input/slightly-rounded-input';
import { SlightlyRoundedInputWithRightIcon } from '../../ui/inputs/slightly-rounded-input-with-right-icon-button/slightly-rounded-input-with-right-icon-button';
import styles from './sign-in-page.module.scss';
import { SvgOpenEyeIcon } from '../../ui/icons';

export const SignInPage: FC = () => {
    const onSignInFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <div className={styles.signInPage}>
            <form className={styles.signInForm}>
                <SlightlyRoundedInput
                    useLabel={true}
                    labelValue="Username"
                    id="sign-in-username-input"
                    placeholder="Enter your username here..."
                />
                <SlightlyRoundedInputWithRightIcon
                    useLabel={true}
                    labelValue="Password"
                    id="sign-in-password-input"
                    placeholder="Enter your password here..."
                    icon={<SvgOpenEyeIcon />}
                    onIconButtonClick={() => console.log('eye button click')}
                />
                <div className={styles.signInActionButtonsContainer}>
                    <button type="submit" onClick={onSignInFormSubmit}>
                        Sign In
                    </button>
                    <button type="button">Forgot Password?</button>
                </div>
            </form>
        </div>
    );
};
