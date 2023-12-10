import { FC } from 'react';
import { Auth } from '../../services/auth/auth';
import styles from './session-page.module.scss';

export const SessionPage: FC = () => {
    const onCreateRequestTokenButtonClickHandler = async () => {
        const data = await Auth.createRequestToken();
        const requestToken = data?.request_token;
        if (requestToken) {
            window.open(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http:localhost:3000/movies-catalog/session/approved`,
                '_self'
            );
        } else {
            window.alert('Error occured while trying to get request token');
        }
    };

    const onCreateSessionClickHandler = async () => {
        const url = window.location.href;
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const requestToken = urlSearchParams.get('request_token');

        if (requestToken) {
            const data = await Auth.createSession(requestToken);
        } else {
            window.alert('Request token not provided');
        }
    };

    return (
        <div className={styles.sessionPage}>
            <button className={styles.sessionPageButton} onClick={onCreateRequestTokenButtonClickHandler}>
                Create request token
            </button>
            <button className={styles.sessionPageButton} onClick={onCreateSessionClickHandler}>
                Create session
            </button>
        </div>
    );
};
