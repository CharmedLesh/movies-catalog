import { ButtonHTMLAttributes, FC } from 'react';
import styles from './filled-rounded-button.module.scss';

export const FilledRoundedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.filledRoundedButton} onClick={onClick}>
            {value}
        </button>
    );
};
