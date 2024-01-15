import { FC } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/lists.interfaces';
import { ListCard } from '../list-card/list-card';
import { InfoCard169Loader } from '../../../../ui/loaders';
import { NoListsBanner } from '../no-lists-banner/no-lists-banner';
import styles from './lists-cards-grid.module.scss';

interface IListsCardsGridProps {
    lists?: IListGeneralInfo[];
    isPending: boolean;
}

export const ListsCardsGrid: FC<IListsCardsGridProps> = (props) => {
    const { lists, isPending } = props;

    const cards = lists?.map((list, index) => {
        return <ListCard list={list} key={index} />;
    });

    if (!isPending && (!lists || lists.length === 0)) return <NoListsBanner />;

    return <div className={styles.grid}>{isPending ? <InfoCard169Loader /> : cards}</div>;
};
