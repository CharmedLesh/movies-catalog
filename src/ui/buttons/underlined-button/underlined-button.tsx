import { ButtonHTMLAttributes, FC } from 'react';
import styles from './underlined-button.module.scss';

export const UnderlinedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick, disabled } = props;

    return (
        <button className={styles.underlinedButton} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};
