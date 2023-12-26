import { ButtonHTMLAttributes, FC } from 'react';
import styles from './accent-filled-rounded-button.module.scss';

export const AccentFilledRoundedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.accentFilledRoundedButton} onClick={onClick}>
            {value}
        </button>
    );
};
