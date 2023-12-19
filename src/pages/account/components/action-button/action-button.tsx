import { ButtonHTMLAttributes, FC } from 'react';
import { UnderlinedButton } from '../../../../ui/buttons';
import styles from './action-button.module.scss';

export const ActionButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { onClick } = props;

    return (
        <div className={styles.actionButton}>
            <UnderlinedButton onClick={onClick} value={'SIGN IN'} />
        </div>
    );
};
