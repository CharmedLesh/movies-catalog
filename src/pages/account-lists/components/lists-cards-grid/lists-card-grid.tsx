import { FC } from 'react';
import { IListGeneralInfo } from '../../../../configs/interfaces/media-lists.interfaces';
import { ListCard } from '../list-card/list-card';
import { InfoCard169Loader } from '../../../../ui/loaders';
import styles from './lists-cards-grid.module.scss';

interface IListsCardsGridProps {
    lists: IListGeneralInfo[];
    isPending: boolean;
}

export const ListsCardsGrid: FC<IListsCardsGridProps> = (props) => {
    const { lists, isPending } = props;

    const generateListsCardsArray = () => {
        let listsCardsArray: JSX.Element[] = [];
        lists.forEach((list, index) => {
            listsCardsArray.push(<ListCard list={list} key={index} />);
        });
        return listsCardsArray;
    };

    return <div className={styles.grid}>{isPending ? <InfoCard169Loader /> : generateListsCardsArray()}</div>;
};
