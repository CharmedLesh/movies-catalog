import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HoverAnimatedUnderlineButton } from '../../../../ui/buttons';
import styles from './menu.module.scss';

export const Menu: FC = () => {
    const navigate = useNavigate();

    const navigateToSignInPage = () => {
        navigate('/movies-catalog/sign-in');
    };

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
                    <HoverAnimatedUnderlineButton value="SIGN IN" onClick={navigateToSignInPage} />
                </li>
            </ul>
        </ul>
    );
};
