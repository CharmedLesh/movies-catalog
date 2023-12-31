import { FC } from 'react';
import styles from './error-baner.module.scss';

interface IErrorBannerProps {
    errorDescription: string;
    errorInfo: string;
}

export const ErrorBanner: FC<IErrorBannerProps> = (props) => {
    const { errorDescription, errorInfo } = props;

    return (
        <div className={styles.wrapper}>
            <h1>Oops!</h1>
            <p>{errorDescription}</p>
            <p>
                <i>{errorInfo}</i>
            </p>
        </div>
    );
};
