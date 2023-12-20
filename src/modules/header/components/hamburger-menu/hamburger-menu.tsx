import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './hamburger-menu.module.scss';
import { useUser } from '../../../../services/hooks/store-hooks';

interface IHamburgerMenuProps {
    isHamburgerMenuToggled: boolean;
    toggleHamburgerMenu: () => void;
    signOutHandler: () => void;
    hamburgerMenuButtonRef: React.RefObject<HTMLDivElement>;
}

export const HamburgerMenu: FC<IHamburgerMenuProps> = (props) => {
    const { isHamburgerMenuToggled, toggleHamburgerMenu, signOutHandler, hamburgerMenuButtonRef } = props;
    const { isUser } = useUser();

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

    const hamburgerMenuClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerMenu} ${styles.hamburgerMenuToggled}`
        : styles.hamburgerMenu;

    const accountLinkValue = isUser ? 'Account' : 'Sign In';

    return (
        <ul className={hamburgerMenuClassName} ref={hamburgerMenu}>
            <ul>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/trending`} onClick={toggleHamburgerMenu}>
                        Trending
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/popular`} onClick={toggleHamburgerMenu}>
                        Popular
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/about`} onClick={toggleHamburgerMenu}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/contact`} onClick={toggleHamburgerMenu}>
                        Contact
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/account`} onClick={toggleHamburgerMenu}>
                        {accountLinkValue}
                    </Link>
                </li>
                {isUser && (
                    <li>
                        <button onClick={() => signOutHandler()}>Sign Out</button>
                    </li>
                )}
            </ul>
        </ul>
    );
};
