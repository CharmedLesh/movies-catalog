import { ButtonHTMLAttributes, FC } from 'react';
import styles from './filled-button.module.scss';

export const FilledButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.filledButton} onClick={onClick}>
            {value}
        </button>
    );
};
