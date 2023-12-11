import { FC } from 'react';
import { AuthRequests } from '../../services/auth/auth-requests';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { ActionButton } from './components/action-button/action-button';
import styles from './sign-in-page.module.scss';

export const SignInPage: FC = () => {
    const createRequestToken = async () => {
        const data = await AuthRequests.createRequestToken();
        const requestToken = data?.request_token;
        if (requestToken) {
            window.open(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.REACT_APP_URL_HOST}${process.env.REACT_APP_URL_PATHNAME_CORE}/sign-in/approved`,
                '_self'
            );
        } else {
            window.alert('Error occured while trying to get request token');
        }
    };

    const createSession = async () => {
        const url = window.location.href;
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const requestToken = urlSearchParams.get('request_token');

        if (requestToken) {
            const data = await AuthRequests.createSession(requestToken);
            console.log(data?.session_id);
        } else {
            window.alert('Request token not provided');
        }
    };

    const onActionButtonClickHandler = async () => {
        await createRequestToken();
    };

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInPageContent}>
                <Disclaimer actionButton={<ActionButton onClick={onActionButtonClickHandler} />} />
            </div>
        </div>
    );
};
