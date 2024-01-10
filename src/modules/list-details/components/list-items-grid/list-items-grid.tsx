import { FC } from 'react';
import { IMediaItem } from '../../../../configs/interfaces/media.interfaces';
import { IComments } from '../../../../configs/interfaces/lists.interfaces';
import { NoItemsBanner } from '../no-items-banner/no-items-banner';
import { ListItemCard } from '../list-item-card/list-item-card';
import { MediaCard23Loader } from '../../../../ui/loaders';
import styles from './list-items-grid.module.scss';

interface IListItemsGridProps {
    isPending: boolean;
    items?: IMediaItem[];
    comments?: IComments | {};
}

export const ListItemsGrid: FC<IListItemsGridProps> = (props) => {
    const { isPending, items, comments } = props;

    const getCommentByKey = (comments: IComments, commentKey: string): string | null => {
        if (comments.hasOwnProperty(commentKey)) {
            const commentValue = comments[commentKey as keyof IComments];
            return commentValue;
        }
        return null;
    };

    const cards = items?.map((item, index) => {
        let comment: string | null = null;

        if (comments && !!Object.keys(comments).length) {
            const commentKey = `${item.media_type}:${item.id}`;
            comment = getCommentByKey(comments, commentKey);
        }

        return <ListItemCard item={item} key={index} comment={comment} />;
    });

    if (!isPending && items?.length === 0) return <NoItemsBanner />;

    return <div className={styles.grid}>{isPending ? <MediaCard23Loader /> : cards}</div>;
};
