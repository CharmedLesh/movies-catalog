import { ButtonHTMLAttributes, FC } from 'react';
import styles from './dark-grey-filled-button.module.scss';

export const DarkGreyFilledButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick, disabled } = props;

    return (
        <button className={styles.darkGreyFilledButton} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};
