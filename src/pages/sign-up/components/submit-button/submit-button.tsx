import { ButtonHTMLAttributes, FC } from 'react';
import { FilledButton } from '../../../../ui/buttons';
import styles from './submit-button.module.scss';

export const SubmitButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { onClick } = props;

    return (
        <div className={styles.submitButtonWrapper}>
            <FilledButton onClick={onClick} value="SIGN UP" />
        </div>
    );
};
