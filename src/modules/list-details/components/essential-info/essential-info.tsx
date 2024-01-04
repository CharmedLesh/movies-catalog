import { FC } from 'react';
import { IListDetails } from '../../../../configs/interfaces/lists.interfaces';
import { ActionButtons } from '../action-buttons/action-buttons';
import { Dots } from '../../../../ui/loaders';
import styles from './essential-info.module.scss';

interface IEssentialInfoProps {
    isPending: boolean;
    list: IListDetails | undefined;
}

export const EssentialInfo: FC<IEssentialInfoProps> = (props) => {
    const { list, isPending } = props;

    // conditional background
    const gradient = 'linear-gradient(to right, rgba(18, 69, 89, 0.65) 0%, rgba(255, 250, 255, 0.85) 85%)';

    const image = list?.poster_path
        ? `https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list?.poster_path}`
        : list?.items[0]
        ? list.items[0].backdrop_path
            ? `https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list?.items[0].backdrop_path}`
            : undefined
        : undefined;

    const imageStyle = {
        backgroundImage: isPending ? gradient : image ? `${gradient}, url(${image})` : gradient
    };

    // conditional text
    const author = list?.created_by ? list.created_by : 'Unknown Author';
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
                        <ActionButtons isPending={isPending} />
                    </div>
                </div>
                <div className={styles.createdBy}>
                    <p className={styles.subtitle}>Created by:</p>
                    {isPending ? (
                        <div className={styles.dotsContainer}>
                            <Dots />
                        </div>
                    ) : (
                        <p className={styles.info}>{author}</p>
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
                <ActionButtons isPending={isPending} />
            </div>
        </>
    );
};
