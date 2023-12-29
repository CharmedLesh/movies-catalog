import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks/store-hooks';
import { removeSessionId } from '../../services/store/slices/session-id-slice';
import { removeUser } from '../../services/store/slices/user-slice';
import { Credits } from './components/credits/credits';
import { HeaderEssentialContent } from './components/header-essential-content/header-essential-content';
import { HamburgerMenu } from './components/hamburger-menu/hamburger-menu';
import styles from './index.module.scss';

export const HeaderModule: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const hamburgerMenuButtonRef = useRef<HTMLDivElement>(null);

    const [isHamburgerMenuToggled, setHamburgerMenuToggled] = useState<boolean>(false);

    const toggleHamburgerMenu = () => {
        setHamburgerMenuToggled((prevState) => !prevState);
    };

    const signOutHandler = (): void => {
        navigate('/');
        dispatch(removeSessionId());
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
