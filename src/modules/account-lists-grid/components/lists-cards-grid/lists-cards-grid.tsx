import { FC } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/lists.interfaces';
import { ListCard } from '../list-card/list-card';
import { InfoCard169Loader } from '../../../../ui/loaders';
import styles from './lists-cards-grid.module.scss';

interface IListsCardsGridProps {
    lists: IListGeneralInfo[];
    isPending: boolean;
}

export const ListsCardsGrid: FC<IListsCardsGridProps> = (props) => {
    const { lists, isPending } = props;

    const cards = lists.map((list, index) => {
        return <ListCard list={list} key={index} />;
    });

    return <div className={styles.grid}>{isPending ? <InfoCard169Loader /> : cards}</div>;
};
