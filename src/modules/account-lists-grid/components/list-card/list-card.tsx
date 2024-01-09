import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IListGeneralInfo } from '../../../../configs/interfaces/lists.interfaces';
import { InfoCard169 } from '../../../../ui/cards';

interface IListCardProps {
    list: IListGeneralInfo;
}

export const ListCard: FC<IListCardProps> = (props) => {
    const { list } = props;
    const navigate = useNavigate();

    const listCardClickHandler = () => {
        navigate(`/account/lists/${list.id}`);
    };

    const posterImage = list.poster_path ? (
        <img src={`https://www.themoviedb.org/t/p/w1000_and_h563_multi_faces${list.poster_path}`} />
    ) : null;

    const description = list.description.length ? list.description : 'No description';

    return (
        <InfoCard169
            image={posterImage}
            noImageText="POSTER NOT FOUND"
            title={list.name}
            description={description}
            actionButtonText="View List"
            actionButtonClickHandler={listCardClickHandler}
        />
    );
};
