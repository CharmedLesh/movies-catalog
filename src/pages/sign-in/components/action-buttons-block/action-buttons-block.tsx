import { ButtonHTMLAttributes, FC } from 'react';
import { SubmitButton } from '../submit-button/submit-button';
import { ForgotPasswordLink } from '../forgot-password-link/forgot-password-link';
import styles from './action-buttons-block.module.scss';

export const ActionButtonsBlock: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { onClick } = props;

    return (
        <div className={styles.actionButtonsBlock}>
            <SubmitButton onClick={onClick} />
            <ForgotPasswordLink />
        </div>
    );
};
