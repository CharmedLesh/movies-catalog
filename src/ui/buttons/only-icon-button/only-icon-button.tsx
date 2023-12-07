import { ButtonHTMLAttributes, FC } from 'react';
import { Logger } from '../../../services/logger/logger';
import styles from './only-icon-button.module.scss';

interface IOnlyIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element | string;
}

export const OnlyIconButton: FC<IOnlyIconButton> = (props) => {
    const { icon, onClick, type } = props;

    const isIconValid = (): boolean => {
        if (typeof icon === 'string' && icon.length !== 1) {
            return false;
        }
        return true;
    };

    !isIconValid() && Logger.logError('Wrong icon prowided. Icon should be SVG or string with 1 char.');

    return (
        <button className={styles.onlyIconButton} onClick={onClick} type={type}>
            {isIconValid() ? icon : '?'}
        </button>
    );
};
