import { FC } from 'react';
import { RequestLoader } from '../../../../ui/loaders/index';
import styles from './loader.module.scss';

interface ILoaderProps {
    status: 'pending' | 'resolved' | 'rejected' | null;
    error: string | null;
}

export const Loader: FC<ILoaderProps> = (props) => {
    const { status, error } = props;

    const loadingText = 'Creating session';
    const successText = 'Session created';

    return (
        <div className={styles.loader}>
            {status && <RequestLoader status={status} />}
            <p className={styles.statusText}>
                {status === 'pending' && loadingText}
                {status === 'resolved' && successText}
                {status === 'rejected' && error}
            </p>
        </div>
    );
};
