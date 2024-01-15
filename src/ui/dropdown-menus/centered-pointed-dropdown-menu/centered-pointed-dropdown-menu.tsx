import { FC, useEffect, useRef, useState } from 'react';
import styles from './centered-pointed-dropdown-menu.module.scss';

interface ICenteredPointedDropdownMenuProps {
    triggerElement: JSX.Element;
    menuItems: JSX.Element[];
}

export const CenteredPointedDropdownMenu: FC<ICenteredPointedDropdownMenuProps> = (props) => {
    const { triggerElement, menuItems } = props;
    const centeredPointedDropdownMenuRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    // close dropdown on click out of ref
    useEffect(() => {
        if (isMenuOpen === true) {
            const handleClickOutside = (event: any) => {
                if (
                    centeredPointedDropdownMenuRef.current &&
                    !centeredPointedDropdownMenuRef.current.contains(event.target)
                ) {
                    setMenuOpen(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    const generateLiElements = () => {
        let arrayOfLi: JSX.Element[] = [];
        menuItems.forEach((element, index) => {
            arrayOfLi.push(
                <li key={index} onClick={() => setMenuOpen(false)}>
                    {element}
                </li>
            );
        });

        return arrayOfLi;
    };

    return (
        <div className={styles.wrapper} ref={centeredPointedDropdownMenuRef}>
            <div onClick={toggleMenu} className={styles.triggerElementWrapper}>
                {triggerElement}
            </div>
            {isMenuOpen && <ul className={styles.menu}>{generateLiElements()}</ul>}
        </div>
    );
};

// todo
// try triangle as background color, not as border
// try $light border on wrapper (highlight with more shadows if required)
// fix on hover first & last items border-radius
