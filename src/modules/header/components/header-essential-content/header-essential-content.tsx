import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HamburgerMenuButton } from '../hamburger-menu-button/hamburger-menu-button';
import { Menu } from '../menu/menu';
import { GeneralSearchfield } from '../general-searchfield/general-searchfield';
import { SvgClapperboardIcon } from '../../../../ui/icons';
import styles from './header-essential-content.module.scss';

interface IheaderEssentialContent {
    isHamburgerMenuToggled: boolean;
    toggleHamburgerMenu: () => void;
    signOutHandler: () => void;
    hamburgerMenuButtonRef: React.RefObject<HTMLDivElement>;
}

export const HeaderEssentialContent: FC<IheaderEssentialContent> = (props) => {
    const { isHamburgerMenuToggled, toggleHamburgerMenu, signOutHandler, hamburgerMenuButtonRef } = props;

    return (
        <div className={styles.headerEssentialContent}>
            <div>
                <HamburgerMenuButton
                    isHamburgerMenuToggled={isHamburgerMenuToggled}
                    hamburgerMenuButtonClickHandler={toggleHamburgerMenu}
                    hamburgerMenuButtonRef={hamburgerMenuButtonRef}
                />
                <Menu signOutHandler={signOutHandler} />
            </div>
            <div className={styles.searchfieldContainer}>
                <GeneralSearchfield />
            </div>
            <Link to={`/`}>
                <SvgClapperboardIcon className={styles.logo} />
            </Link>
        </div>
    );
};
