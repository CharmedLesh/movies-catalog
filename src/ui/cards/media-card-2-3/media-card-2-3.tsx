import { FC, useEffect, useRef, useState } from 'react';
import { FilledRoundedButton, OnlyIconButton } from '../../buttons';
import styles from './media-card-2-3.module.scss';

interface IMediaCard23Props {
    imageUrl: string | null;
    noImageText: string;
    title: string;
    description: string;
    actionButtonText: string;
    actionButtonClickHandler: () => void;
    starsRating?: number;
    iconButton?: {
        icon: JSX.Element | string;
        onClickHandler: () => void;
    };
}

export const MediaCard23: FC<IMediaCard23Props> = (props) => {
    const {
        imageUrl,
        noImageText,
        title,
        description,
        actionButtonText,
        actionButtonClickHandler,
        starsRating,
        iconButton
    } = props;
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

    const gradient =
        'linear-gradient(345deg, transparent 0%, transparent 85%, rgba(18, 69, 89, 0.7) 90%, rgba(18, 69, 89, 0.7) 100%)';

    const imageContent = !imageUrl && <p className={styles.imageNotFound}>{noImageText}</p>;
    const cardClassName = isInfoExpanded ? `${styles.card} ${styles.cardTouched}` : styles.card;
    const infoPanelClassName = isInfoExpanded ? `${styles.infoPanel} ${styles.infoPanelTouched}` : styles.infoPanel;

    const starsStyle = starsRating && {
        '--rating-percentage': `${starsRating * 10}%`
    };

    const imageStyle = {
        backgroundImage: imageUrl ? (starsRating ? `${gradient}, url(${imageUrl})` : `url(${imageUrl})`) : ''
    };

    return (
        <div className={cardClassName} onClick={handleCardClick} ref={cardRef}>
            <div style={imageStyle} className={styles.imageWrapper}>
                {imageContent}
            </div>
            {starsRating && <div className={styles.stars} style={starsStyle as React.CSSProperties}></div>}
            <div className={infoPanelClassName}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.actionButtons}>
                    <div className={styles.actionButton}>
                        <FilledRoundedButton
                            value={actionButtonText}
                            onClick={actionButtonClickHandlerWithoutPropagation}
                        />
                    </div>
                    {iconButton && (
                        <div className={styles.commentButtonWrapper}>
                            <OnlyIconButton icon={iconButton.icon} onClick={iconButton.onClickHandler} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
