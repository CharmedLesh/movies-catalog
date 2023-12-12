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
                <Menu />
            </div>
            <div className={styles.searchfieldContainer}>
                <GeneralSearchfield />
            </div>
            <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}`}>
                <SvgClapperboardIcon className={styles.logo} />
            </Link>
        </div>
    );
};