import { FC, useState } from 'react';
import styles from './hamburger-menu-button.module.scss';

interface IHamburgerMenuButtonProps {
    isHamburgerMenuToggled: boolean;
    hamburgerMenuButtonClickHandler: () => void;
}

export const HamburgerMenuButton: FC<IHamburgerMenuButtonProps> = (props) => {
    const { isHamburgerMenuToggled, hamburgerMenuButtonClickHandler } = props;

    const hamburgerButtonClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerButton} ${styles.hamburgerButtonToggled}`
        : styles.hamburgerButton;

    return (
        <div className={styles.hamburgerButtonContainer} onClick={hamburgerMenuButtonClickHandler}>
            <button className={hamburgerButtonClassName}></button>
        </div>
    );
};
