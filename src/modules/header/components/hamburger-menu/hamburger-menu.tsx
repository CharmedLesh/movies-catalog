import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './hamburger-menu.module.scss';
import { useSessionId } from '../../../../services/hooks/store-hooks';

interface IHamburgerMenuProps {
    isHamburgerMenuToggled: boolean;
    toggleHamburgerMenu: () => void;
    signOutHandler: () => void;
    hamburgerMenuButtonRef: React.RefObject<HTMLDivElement>;
}

export const HamburgerMenu: FC<IHamburgerMenuProps> = (props) => {
    const { isHamburgerMenuToggled, toggleHamburgerMenu, signOutHandler, hamburgerMenuButtonRef } = props;
    const { isSessionId } = useSessionId();

    const hamburgerMenu = useRef<HTMLUListElement>(null);

    // close menu on click out of ref
    useEffect(() => {
        if (isHamburgerMenuToggled === true) {
            const handleClickOutside = (event: any) => {
                if (hamburgerMenu.current && !hamburgerMenu.current.contains(event.target)) {
                    if (hamburgerMenuButtonRef.current && !hamburgerMenuButtonRef.current.contains(event.target)) {
                        toggleHamburgerMenu();
                    }
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isHamburgerMenuToggled]);

    const sigOutClickHandler = () => {
        signOutHandler();
        toggleHamburgerMenu();
    };

    const hamburgerMenuClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerMenu} ${styles.hamburgerMenuToggled}`
        : styles.hamburgerMenu;

    return (
        <ul className={hamburgerMenuClassName} ref={hamburgerMenu}>
            <ul>
                <li>
                    <Link to={`/movies`} onClick={toggleHamburgerMenu}>
                        Movies
                    </Link>
                </li>
                <li>
                    <Link to={`/tv`} onClick={toggleHamburgerMenu}>
                        TV Shows
                    </Link>
                </li>
                <li>
                    <Link to={`/people`} onClick={toggleHamburgerMenu}>
                        People
                    </Link>
                </li>
                <li>
                    <Link to={`/more`} onClick={toggleHamburgerMenu}>
                        More
                    </Link>
                </li>
            </ul>
            <ul>
                {isSessionId ? (
                    <li>
                        <Link to={`/account`} onClick={toggleHamburgerMenu}>
                            Account
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to={`/sign-in`} onClick={toggleHamburgerMenu}>
                            Sign In
                        </Link>
                    </li>
                )}
                {isSessionId && (
                    <li>
                        <button onClick={sigOutClickHandler}>Sign Out</button>
                    </li>
                )}
            </ul>
        </ul>
    );
};
