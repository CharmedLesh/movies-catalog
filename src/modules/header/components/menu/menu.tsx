import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionId } from '../../../../services/hooks/store-hooks';
import { Account } from '../account/account';
import { HoverAnimatedUnderlineButton } from '../../../../ui/buttons';
import styles from './menu.module.scss';

export const Menu: FC = () => {
    const { isSessionId } = useSessionId();
    const navigate = useNavigate();

    const navigateToSignInPage = () => {
        navigate(`${process.env.REACT_APP_URL_PATHNAME_CORE}/sign-in`);
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
                {isSessionId ? (
                    <Account />
                ) : (
                    <li>
                        <HoverAnimatedUnderlineButton value="SIGN IN" onClick={navigateToSignInPage} />
                    </li>
                )}
            </ul>
        </ul>
    );
};
