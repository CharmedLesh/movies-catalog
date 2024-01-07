import { FC } from 'react';
import { IMediaItem } from '../../../../configs/interfaces/media.interfaces';
import { NoItemsBanner } from '../no-items-banner/no-items-banner';
import { ListItemCard } from '../list-item-card/list-item-card';
import { MediaCard23Loader } from '../../../../ui/loaders';
import styles from './list-items-grid.module.scss';

interface IListItemsGridProps {
    isPending: boolean;
    items?: IMediaItem[];
}

export const ListItemsGrid: FC<IListItemsGridProps> = (props) => {
    const { isPending, items } = props;

    const cards = items?.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
    });

    if (!isPending && items?.length === 0) return <NoItemsBanner />;

    return <div className={styles.grid}>{isPending ? <MediaCard23Loader /> : cards}</div>;
};
