import { ButtonHTMLAttributes, FC } from 'react';
import { Logger } from '../../../services/logger/logger';
import styles from './round-icon-button.module.scss';

interface IRoundIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element | string;
}

export const RoundIconButton: FC<IRoundIconButtonProps> = (props) => {
    const { icon, onClick, type } = props;

    const isIconValid = (): boolean => {
        if (typeof icon === 'string' && icon.length !== 1) {
            return false;
        }
        return true;
    };

    !isIconValid() && Logger.logError('Wrong icon prowided. Icon should be SVG or string with 1 char.');

    return (
        <button className={styles.roundIconButton} onClick={onClick} type={type}>
            {isIconValid() ? icon : '?'}
        </button>
    );
};
