import { AnchorHTMLAttributes, FC } from 'react';
import { Link } from 'react-router-dom';
import { Logger } from '../../../services/logger/logger';
import styles from './icon-in-circle-external-redirect-button.module.scss';

interface IIconInCircleExternalRedirectButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: JSX.Element | string;
    href: string;
}

export const IconInCircleExternalRedirectButton: FC<IIconInCircleExternalRedirectButtonProps> = (props) => {
    const { icon, href, target, rel, title } = props;

    const isIconValid = (): boolean => {
        if (typeof icon === 'string' && icon.length !== 1) {
            Logger.logError('Wrong icon prowided. Icon should be SVG or string with 1 char.');
            return false;
        }
        return true;
    };

    return (
        <Link to={href} target={target} className={styles.iconInCircleExternalRedirectButton} rel={rel} title={title}>
            {isIconValid() ? icon : '?'}
        </Link>
    );
};
