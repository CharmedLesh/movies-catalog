import { FC } from 'react';
import styles from './hamburger-menu-button.module.scss';

interface IHamburgerMenuButtonProps {
    isHamburgerMenuToggled: boolean;
    hamburgerMenuButtonClickHandler: () => void;
    hamburgerMenuButtonRef: React.RefObject<HTMLDivElement>;
}

export const HamburgerMenuButton: FC<IHamburgerMenuButtonProps> = (props) => {
    const { isHamburgerMenuToggled, hamburgerMenuButtonClickHandler, hamburgerMenuButtonRef } = props;

    const hamburgerButtonClassName = isHamburgerMenuToggled
        ? `${styles.hamburgerButton} ${styles.hamburgerButtonToggled}`
        : styles.hamburgerButton;

    return (
        <div
            className={styles.hamburgerButtonContainer}
            onClick={hamburgerMenuButtonClickHandler}
            ref={hamburgerMenuButtonRef}
        >
            <button className={hamburgerButtonClassName}></button>
        </div>
    );
};
