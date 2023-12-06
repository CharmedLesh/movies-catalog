import { FC } from 'react';
import { UnderlineButton } from '../../../../ui/buttons/underline-button/underline-button';
import styles from './menu.module.scss';

export const Menu: FC = () => {
    return (
        <ul className={styles.menu}>
            <ul className={styles.navMenu}>
                <li>
                    <button>Movies</button>
                </li>
                <li>
                    <button>TV Shows</button>
                </li>
                <li>
                    <button>People</button>
                </li>
                <li>
                    <button>More</button>
                </li>
            </ul>
            <ul className={styles.authMenu}>
                <li>
                    <UnderlineButton value="SIGN IN" />
                </li>
                <li>
                    <UnderlineButton value="SIGN UP" />
                </li>
            </ul>
        </ul>
    );
};
