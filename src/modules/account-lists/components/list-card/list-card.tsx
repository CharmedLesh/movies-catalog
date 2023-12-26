import { FC } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/media-lists.interfaces';
import { InfoCardWithActionButtonTitleDescriptionEllipsis } from '../../../../ui/cards';

interface IListCardProps {
    list: IListGeneralInfo;
}

export const ListCard: FC<IListCardProps> = (props) => {
    const { list } = props;

    const listCardClickHandler = () => {
        console.log('list card action button clicked');
    };

    const posterImage = list.poster_path ? (
        <img src={`https://www.themoviedb.org/t/p/w1000_and_h563_multi_faces${list.poster_path}`} />
    ) : null;

    const description = list.description.length ? list.description : 'No description';

    return (
        <InfoCardWithActionButtonTitleDescriptionEllipsis
            image={posterImage}
            noImageText="POSTER NOT FOUND"
            title={list.name}
            description={description}
            actionButtonText="View List"
            actionButtonClickHandler={listCardClickHandler}
        />
    );
};

// todo
// check if redirect works correctly if session id not provided
// router remake
// loader while fetching lists
