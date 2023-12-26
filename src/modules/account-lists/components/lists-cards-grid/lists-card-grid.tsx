import { FC } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/media-lists.interfaces';
import { ListCard } from '../list-card/list-card';
import styles from './lists-cards-grid.module.scss';

interface IListsCardsGridProps {
    lists: IListGeneralInfo[];
}

export const ListsCardsGrid: FC<IListsCardsGridProps> = (props) => {
    const { lists } = props;

    const generateListsCardsArray = () => {
        let listsCardsArray: JSX.Element[] = [];
        lists.forEach((list, index) => {
            listsCardsArray.push(<ListCard list={list} key={index} />);
        });
        return listsCardsArray;
    };

    return <div className={styles.grid}>{generateListsCardsArray()}</div>;
};
