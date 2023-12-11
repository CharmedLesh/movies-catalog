import { FC, useState } from 'react';
import { Credits } from './components/credits/credits';
import { HeaderEssentialContent } from './components/header-essential-content/header-essential-content';
import { HamburgerMenu } from './components/hamburger-menu/hamburger-menu';
import styles from './index.module.scss';

export const HeaderModule: FC = () => {
    const [isHamburgerMenuToggled, setHamburgerMenuToggled] = useState<boolean>(false);

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
