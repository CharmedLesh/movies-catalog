import { ButtonHTMLAttributes, FC } from 'react';
import styles from './underline-button.module.scss';

export const UnderlineButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.underlineButton} onClick={onClick}>
            {value}
        </button>
    );
};
