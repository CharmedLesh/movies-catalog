import { FC, useEffect, useRef, useState } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/media-lists.interfaces';
import styles from './list-card.module.scss';

interface IListCardProps {
    list: IListGeneralInfo;
}

export const ListCard: FC<IListCardProps> = (props) => {
    const { list } = props;
    const inspectListCardRef = useRef<HTMLDivElement>(null);

    const [isInfoExpanded, setIsInfoExpanded] = useState(false);

    // mobile layout: shrink info on click out of button if info was expanded
    useEffect(() => {
        if (isInfoExpanded === true) {
            const handleClickOutOfListCard = (event: any) => {
                if (inspectListCardRef.current && !inspectListCardRef.current.contains(event.target)) {
                    setIsInfoExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutOfListCard, true);
            return () => {
                document.removeEventListener('click', handleClickOutOfListCard, true);
            };
        }
    }, [isInfoExpanded]);

    const handleCardClick = () => {
        setIsInfoExpanded((prevState) => !prevState);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    // function isTouchDevice() {
    //     return (
    //         'ontouchstart' in window ||
    //         (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches)
    //     );
    // }

    const cardClassName = `${styles.card} ${isInfoExpanded && styles.cardTouched}`;
    const infoClassName = `${styles.info} ${isInfoExpanded && styles.infoTouched}`;

    return (
        <div className={cardClassName} onClick={handleCardClick} ref={inspectListCardRef}>
            <div className={infoClassName}>
                <p className={styles.title}>{list.name}</p>
                <p className={styles.description}>{list.description}</p>
                <button className={styles.inspectButton} onClick={handleButtonClick}>
                    View List
                </button>
            </div>
        </div>
    );
};
