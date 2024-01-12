import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { showModalLightboxPopup } from '../../../../helpers/modal-lightbox-popup';
import { IMediaItem } from '../../../../configs/interfaces/media.interfaces';
import { MediaCard23 } from '../../../../ui/cards';
import { SvgCommentIcon } from '../../../../ui/icons';
import { CommentModalContent } from '../comment-modal-content/comment-modal-content';

interface IListItemCardProps {
    item: IMediaItem;
    comment: string | null;
}

export const ListItemCard: FC<IListItemCardProps> = (props) => {
    const { item, comment } = props;
    const navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/${item.media_type}/${item.id}`);
    };

    const commentButtonClickHandler = (comment: string) => {
        showModalLightboxPopup(<CommentModalContent comment={comment} />);
    };
    const imageUrl = item.poster_path
        ? `https://www.themoviedb.org/t/p/w440_and_h660_multi_faces${item.poster_path}`
        : null;
    const title = item.name ? item.name : item.title ? item.title : 'No Title';
    const description = item.overview ? item.overview : 'No description';
    const starsRating = item.vote_average ? item.vote_average : undefined;
    const icon = comment ? <SvgCommentIcon /> : undefined;
    const iconButton = comment
        ? icon && { icon: icon, onClickHandler: () => commentButtonClickHandler(comment) }
        : undefined;

    return (
        <MediaCard23
            title={title}
            description={description}
            // image={posterImage}
            imageUrl={imageUrl}
            noImageText="POSTER NOT FOUND"
            actionButtonText="View Details"
            actionButtonClickHandler={cardClickHandler}
            starsRating={starsRating}
            iconButton={iconButton}
        />
    );
};
