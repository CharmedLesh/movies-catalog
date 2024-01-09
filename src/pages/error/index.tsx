import { FC } from 'react';
import { ErrorBanner } from '../../components';
import styles from './index.module.scss';

interface IErrorPageProps {
    errorCode: number;
}

export const ErrorPage: FC<IErrorPageProps> = (props) => {
    const { errorCode } = props;

    const getPropperErrorModule = () => {
        switch (errorCode) {
            case 404:
                return ErrorBanner({
                    errorDescription: 'Sorry, page you are looking for doesn`t exist.',
                    errorInfo: 'Not Found'
                });
            default:
                return ErrorBanner({
                    errorDescription: 'Sorry, an unexpected error has occurred.',
                    errorInfo: 'Unexpected Error'
                });
        }
    };

    return <div className={styles.errorPage}>{getPropperErrorModule()}</div>;
};
