import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSessionId, useUser } from '../../services/hooks/store-hooks';
import { removeSessionId } from '../../services/store/slices/session-id-slice';
import { removeUser } from '../../services/store/slices/user-slice';
import { getAccountDetails } from '../../services/store/async-thunks/user-async-thunks';
import { Credits } from './components/credits/credits';
import { HeaderEssentialContent } from './components/header-essential-content/header-essential-content';
import { HamburgerMenu } from './components/hamburger-menu/hamburger-menu';
import styles from './index.module.scss';

export const HeaderModule: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sessionId } = useSessionId();
    const { user, isUser } = useUser();

    const hamburgerMenuButtonRef = useRef<HTMLDivElement>(null);

    const [isHamburgerMenuToggled, setHamburgerMenuToggled] = useState<boolean>(false);

    // get user data if session id found
    useEffect(() => {
        if (sessionId && !isUser) {
            dispatch(getAccountDetails(sessionId));
        }
    }, [sessionId]);
    console.log(user);

    const toggleHamburgerMenu = () => {
        setHamburgerMenuToggled((prevState) => !prevState);
    };

    const signOutHandler = (): void => {
        navigate('/');
        localStorage.removeItem(`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}_SESSION_ID`);
        dispatch(removeSessionId());
        dispatch(removeUser());
    };

    return (
        <header className={styles.header}>
            <Credits />
            <HeaderEssentialContent
                isHamburgerMenuToggled={isHamburgerMenuToggled}
                toggleHamburgerMenu={toggleHamburgerMenu}
                signOutHandler={signOutHandler}
                hamburgerMenuButtonRef={hamburgerMenuButtonRef}
            />
            <HamburgerMenu
                isHamburgerMenuToggled={isHamburgerMenuToggled}
                toggleHamburgerMenu={toggleHamburgerMenu}
                signOutHandler={signOutHandler}
                hamburgerMenuButtonRef={hamburgerMenuButtonRef}
            />
        </header>
    );
};
