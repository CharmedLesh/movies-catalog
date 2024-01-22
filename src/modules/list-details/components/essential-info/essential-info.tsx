import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IListDetailsCollection } from '../../../../interfaces/lists.interfaces';
import { ActionButtons } from '../action-buttons/action-buttons';
import { Dots } from '../../../../ui/loaders';
import styles from './essential-info.module.scss';

interface IEssentialInfoProps {
    isPending: boolean;
    isEditable: boolean;
    listId: string;
    list?: IListDetailsCollection;
}

export const EssentialInfo: FC<IEssentialInfoProps> = (props) => {
    const { list, isEditable, isPending, listId } = props;

    const externalLinkOnAuthor = `https://www.themoviedb.org/u/${list?.created_by.username}`;

    // conditional background
    const gradient = 'linear-gradient(to right, rgba(18, 69, 89, 0.65) 0%, rgba(255, 250, 255, 0.85) 85%)';

    const image = list?.backdrop_path
        ? `https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list.backdrop_path}`
        : list?.results[0]
        ? list.results[0].backdrop_path
            ? `https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list?.results[0].backdrop_path}`
            : undefined
        : undefined;

    const imageStyle = {
        backgroundImage: isPending ? gradient : image ? `${gradient}, url(${image})` : gradient
    };

    // conditional text
    const author = list?.created_by
        ? list.created_by.username
            ? list.created_by.username
            : list.created_by.name
            ? list.created_by.name
            : 'Unknown Author'
        : 'Unknown Author';
    const description = list?.description ? list.description : 'List without description';

    // conditional classNames
    const wrapperClassName = isPending ? `${styles.wrapper} ${styles.wrapperPending}` : styles.wrapper;

    return (
        <>
            <div className={wrapperClassName} style={imageStyle}>
                <div className={styles.topPanel}>
                    {isPending ? (
                        <div className={styles.dotsContainer}>
                            <Dots />
                        </div>
                    ) : (
                        <p>{list?.name}</p>
                    )}
                    <div className={styles.actionButtonsTopPanel}>
                        <ActionButtons isEditable={isEditable} isPending={isPending} listId={listId} />
                    </div>
                </div>
                <div className={styles.createdBy}>
                    <p className={styles.subtitle}>Created by:</p>
                    {isPending ? (
                        <div className={styles.dotsContainer}>
                            <Dots />
                        </div>
                    ) : (
                        <Link
                            to={isEditable ? '/account' : externalLinkOnAuthor}
                            target={isEditable ? '_self' : '_blank'}
                            className={styles.info}
                        >
                            {author}
                        </Link>
                    )}
                </div>
                <div>
                    <p className={styles.subtitle}>About this list:</p>
                    {isPending ? (
                        <div className={styles.dotsContainer}>
                            <Dots />
                        </div>
                    ) : (
                        <p className={styles.info}>{description}</p>
                    )}
                </div>
            </div>
            <div className={styles.actionButtonsBottomPanel}>
                <ActionButtons isPending={isPending} isEditable={isEditable} listId={listId} />
            </div>
        </>
    );
};
