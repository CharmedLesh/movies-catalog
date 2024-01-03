import { ButtonHTMLAttributes, FC } from 'react';
import styles from './accent-outlined-rounded-button.module.scss';

export const AccentOutlinedRoundedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick, disabled } = props;

    return (
        <button className={styles.accentOutlinedRoundedButton} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};
