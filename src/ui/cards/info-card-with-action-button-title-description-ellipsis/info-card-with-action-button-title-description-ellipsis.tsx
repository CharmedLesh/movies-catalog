import { FC, useEffect, useRef, useState } from 'react';
import styles from './info-card-with-action-button-title-description-ellipsis.module.scss';

interface IInfoCardWithActionButtonTitleDescriptionEllipsisProps {
    image: JSX.Element | null;
    noImageText: string;
    title: string;
    description: string;
    actionButtonText: string;
    actionButtonClickHandler: () => void;
}

export const InfoCardWithActionButtonTitleDescriptionEllipsis: FC<
    IInfoCardWithActionButtonTitleDescriptionEllipsisProps
> = (props) => {
    const { image, noImageText, title, description, actionButtonText, actionButtonClickHandler } = props;
    const cardRef = useRef<HTMLDivElement>(null);

    const [isInfoExpanded, setIsInfoExpanded] = useState(false);

    // mobile layout: shrink info on click out of button if info was expanded
    useEffect(() => {
        if (isInfoExpanded === true) {
            const handleClickOutOfCard = (event: any) => {
                if (cardRef.current && !cardRef.current.contains(event.target)) {
                    setIsInfoExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutOfCard, true);
            return () => {
                document.removeEventListener('click', handleClickOutOfCard, true);
            };
        }
    }, [isInfoExpanded]);

    const handleCardClick = () => {
        setIsInfoExpanded((prevState) => !prevState);
    };

    const actionButtonClickHandlerWithoutPropagation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        actionButtonClickHandler();
    };

    const imageContent = image ? image : <p className={styles.imageNotFound}>{noImageText}</p>;
    const cardClassName = `${styles.card} ${isInfoExpanded && styles.cardTouched}`;
    const infoPanelClassName = `${styles.infoPanel} ${isInfoExpanded && styles.infoPanelTouched}`;

    return (
        <div className={cardClassName} onClick={handleCardClick} ref={cardRef}>
            <div className={styles.imageWrapper}>{imageContent}</div>
            <div className={infoPanelClassName}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <button className={styles.actionButton} onClick={actionButtonClickHandlerWithoutPropagation}>
                    {actionButtonText}
                </button>
            </div>
        </div>
    );
};
