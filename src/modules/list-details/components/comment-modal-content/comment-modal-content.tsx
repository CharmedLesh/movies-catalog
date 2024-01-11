import { FC } from 'react';
import styles from './comment-modal-content.module.scss';

interface ICommentModalContentProps {
    comment: string;
}

export const CommentModalContent: FC<ICommentModalContentProps> = (props) => {
    const { comment } = props;

    return <div className={styles.wrapper}>{comment}</div>;
};
