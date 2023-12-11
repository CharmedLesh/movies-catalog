import { ButtonHTMLAttributes, FC } from 'react';
import styles from './hover-animated-underline-button.module.scss';

export const HoverAnimatedUnderlineButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { value, onClick } = props;

    return (
        <button className={styles.hoverAnimatedUnderlineButton} onClick={onClick}>
            {value}
        </button>
    );
};
