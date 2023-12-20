import { FC } from 'react';
import styles from './hover-centered-pointed-dropdown-menu.module.scss';

interface IHoverCenteredPointedDropdownMenuProps {
    triggerElement: JSX.Element;
    menuItems: JSX.Element[];
}

export const HoverCenteredPointedDropdownMenu: FC<IHoverCenteredPointedDropdownMenuProps> = (props) => {
    const { triggerElement, menuItems } = props;

    const generateLiElements = () => {
        let arrayOfLi: JSX.Element[] = [];
        menuItems.forEach((element, index) => {
            arrayOfLi.push(<li key={index}>{element}</li>);
        });

        return arrayOfLi;
    };

    return (
        <div className={styles.hoverCenteredPointedDropdownMenuWrapper}>
            {triggerElement}
            <ul className={styles.hoverCenteredPointedDropdownMenuContent}>{generateLiElements()}</ul>
        </div>
    );
};
