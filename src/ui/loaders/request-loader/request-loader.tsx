import { FC } from 'react';
import { Spinner } from '../index';
import styles from './request-loader.module.scss';
import { SvgStatusFailIcon, SvgStatusSuccessIcon } from '../../icons';

interface IRequestLoaderProps {
    status: 'pending' | 'resolved' | 'rejected';
}

export const RequestLoader: FC<IRequestLoaderProps> = (props) => {
    const { status } = props;

    return (
        <div className={styles.requestLoader}>
            {status === 'pending' && <Spinner />}
            {status === 'resolved' && <SvgStatusSuccessIcon />}
            {status === 'rejected' && <SvgStatusFailIcon />}
        </div>
    );
};
