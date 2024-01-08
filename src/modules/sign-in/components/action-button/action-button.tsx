import { ButtonHTMLAttributes, FC } from 'react';
import { UnderlinedButton } from '../../../../ui/buttons';
import styles from './action-button.module.scss';

export const ActionButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { onClick, disabled, value } = props;

    return (
        <div className={styles.actionButton}>
            <UnderlinedButton onClick={onClick} value={value} disabled={disabled} />
        </div>
    );
};
