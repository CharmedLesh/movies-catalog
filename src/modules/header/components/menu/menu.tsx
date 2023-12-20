import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../services/hooks/store-hooks';
import { AccountDropdownMenu } from '../account-dropdown-menu/account-dropdown-menu';
import { HoverAnimatedUnderlineButton } from '../../../../ui/buttons';
import styles from './menu.module.scss';

export const Menu: FC = () => {
    const { isUser } = useUser();
    const navigate = useNavigate();

    const navigateToAccountPage = () => {
        navigate(`${process.env.REACT_APP_URL_PATHNAME_CORE}/account`);
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
                {isUser ? (
                    <AccountDropdownMenu />
                ) : (
                    <li>
                        <HoverAnimatedUnderlineButton value="SIGN IN" onClick={navigateToAccountPage} />
                    </li>
                )}
            </ul>
        </ul>
    );
};
