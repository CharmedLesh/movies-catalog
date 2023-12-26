import { ButtonHTMLAttributes, FC } from 'react';
import styles from './dark-grey-filled-button.module.scss';

export const DarkGreyFilledButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.darkGreyFilledButton} onClick={onClick}>
            {value}
        </button>
    );
};
