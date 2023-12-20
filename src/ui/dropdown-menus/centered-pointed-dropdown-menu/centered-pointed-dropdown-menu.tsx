import { FC, useState } from 'react';
import styles from './centered-pointed-dropdown-menu.module.scss';

interface ICenteredPointedDropdownMenuProps {
    triggerElement: JSX.Element;
    menuItems: JSX.Element[];
}

export const CenteredPointedDropdownMenu: FC<ICenteredPointedDropdownMenuProps> = (props) => {
    const { triggerElement, menuItems } = props;

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    const generateLiElements = () => {
        let arrayOfLi: JSX.Element[] = [];
        menuItems.forEach((element, index) => {
            arrayOfLi.push(<li key={index}>{element}</li>);
        });

        return arrayOfLi;
    };

    return (
        <div className={styles.centeredPointedDropdownMenuWrapper}>
            <div onClick={toggleMenu} className={styles.triggerElementWrapper}>
                {triggerElement}
            </div>
            {isMenuOpen && <ul className={styles.centeredPointedDropdownMenuContent}>{generateLiElements()}</ul>}
        </div>
    );
};
