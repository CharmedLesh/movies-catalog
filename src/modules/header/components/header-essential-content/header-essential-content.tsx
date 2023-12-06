import { FC } from 'react';
import { HamburgerMenuButton } from '../hamburger-menu-button/hamburger-menu-button';
import { SvgClapperboardIcon } from '../../../../ui/icons';
import styles from './header-essential-content.module.scss';
import { Link } from 'react-router-dom';
import { GeneralSearchfield } from '../general-searchfield/general-searchfield';

interface IheaderEssentialContent {
    isHamburgerMenuToggled: boolean;
    toggleHamburgerMenu: () => void;
}

export const HeaderEssentialContent: FC<IheaderEssentialContent> = (props) => {
    const { isHamburgerMenuToggled, toggleHamburgerMenu } = props;

    return (
        <div className={styles.headerEssentialContent}>
            <div>
                <HamburgerMenuButton
                    isHamburgerMenuToggled={isHamburgerMenuToggled}
                    hamburgerMenuButtonClickHandler={toggleHamburgerMenu}
                />
                <ul className={styles.menu}>
                    <ul className={styles.navMenu}>
                        <li>Movies</li>
                        <li>TV Shows</li>
                        <li>People</li>
                        <li>More</li>
                    </ul>
                    <ul className={styles.authMenu}>
                        <li>SIGN IN</li>
                        <li>SIGN UP</li>
                    </ul>
                </ul>
            </div>
            <div className={styles.searchfieldContainer}>
                <GeneralSearchfield />
            </div>
            <Link to="/">
                <SvgClapperboardIcon className={styles.logo} />
            </Link>
        </div>
    );
};
