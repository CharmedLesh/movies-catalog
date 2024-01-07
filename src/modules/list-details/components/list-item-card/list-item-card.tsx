import { FC } from 'react';
import { MediaCard23 } from '../../../../ui/cards';
import { useNavigate } from 'react-router-dom';
import { IMediaItem } from '../../../../configs/interfaces/media.interfaces';

interface IListItemCardProps {
    item: IMediaItem;
}

export const ListItemCard: FC<IListItemCardProps> = (props) => {
    const { item } = props;
    const navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/${item.media_type}/${item.id}`);
    };

    const posterImage = item.poster_path ? (
        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_multi_faces${item.poster_path}`} />
    ) : null;

    const title = item.name ? item.name : item.title ? item.title : 'No Title';
    const description = item.overview ? item.overview : 'No description';

    return (
        <MediaCard23
            title={title}
            description={description}
            image={posterImage}
            noImageText="POSTER NOT FOUND"
            actionButtonText="View Details"
            actionButtonClickHandler={cardClickHandler}
            rating={item.vote_average}
        />
    );
};
