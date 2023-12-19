import { FC, useEffect, useState } from 'react';
import { Credits } from './components/credits/credits';
import { HeaderEssentialContent } from './components/header-essential-content/header-essential-content';
import { HamburgerMenu } from './components/hamburger-menu/hamburger-menu';
import { useAppDispatch, useSessionId, useUser } from '../../services/hooks/store-hooks';
import { getAccountDetails } from '../../services/store/async-thunks/user-async-thunks';
import styles from './index.module.scss';

export const HeaderModule: FC = () => {
    const dispatch = useAppDispatch();
    const { sessionId, isSessionId } = useSessionId();
    const { user, isUser } = useUser();
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

    return (
        <header className={styles.header}>
            <Credits />
            <HeaderEssentialContent
                isHamburgerMenuToggled={isHamburgerMenuToggled}
                toggleHamburgerMenu={toggleHamburgerMenu}
            />
            <HamburgerMenu isHamburgerMenuToggled={isHamburgerMenuToggled} toggleHamburgerMenu={toggleHamburgerMenu} />
        </header>
    );
};
