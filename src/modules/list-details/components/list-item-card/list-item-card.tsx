import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMediaItem } from '../../../../configs/interfaces/media.interfaces';
import { MediaCard23 } from '../../../../ui/cards';
import { SvgCommentIcon } from '../../../../ui/icons';
import { useAppDispatch } from '../../../../services/hooks/store-hooks';
import { setModalLightboxPopupState } from '../../../../services/store/slices/modal-lightbox-popup-slice';

interface IListItemCardProps {
    item: IMediaItem;
    comment: string | null;
}

export const ListItemCard: FC<IListItemCardProps> = (props) => {
    const { item, comment } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/${item.media_type}/${item.id}`);
    };

    const commentButtonClickHandler = () => {
        if (comment) {
            dispatch(setModalLightboxPopupState({ content: <div>{comment}</div> }));
        }
    };

    const posterImage = item.poster_path ? (
        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_multi_faces${item.poster_path}`} />
    ) : null;
    const title = item.name ? item.name : item.title ? item.title : 'No Title';
    const description = item.overview ? item.overview : 'No description';
    const starsRating = item.vote_average ? item.vote_average : undefined;
    const icon = comment ? <SvgCommentIcon /> : undefined;
    const iconButton = icon && { icon: icon, onClickHandler: commentButtonClickHandler };

    return (
        <MediaCard23
            title={title}
            description={description}
            image={posterImage}
            noImageText="POSTER NOT FOUND"
            actionButtonText="View Details"
            actionButtonClickHandler={cardClickHandler}
            starsRating={starsRating}
            iconButton={iconButton}
        />
    );
};
