import { ButtonHTMLAttributes, FC } from 'react';
import styles from './outlined-rounded-button.module.scss';

export const OutlinedRoundedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick, disabled } = props;

    return (
        <button className={styles.outlinedRoundedButton} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};
