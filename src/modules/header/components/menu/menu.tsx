import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnderlinedButton } from '../../../../ui/buttons';
import styles from './menu.module.scss';

export const Menu: FC = () => {
    const navigate = useNavigate();

    const navigateToSignInPage = () => {
        navigate('/sign-in');
    };

    const navigateToSignUpPage = () => {
        navigate('/sign-up');
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
                    <UnderlinedButton value="SIGN IN" onClick={navigateToSignInPage} />
                </li>
                <li>
                    <UnderlinedButton value="SIGN UP" onClick={navigateToSignUpPage} />
                </li>
            </ul>
        </ul>
    );
};
