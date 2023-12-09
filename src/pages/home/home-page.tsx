import { FC } from 'react';
import { Auth } from '../../services/auth/auth';
import styles from './home-page.module.scss';

export const HomePage: FC = () => {
    const onCreateRequestTokenButtonClickHandler = async () => {
        const data = await Auth.createRequestToken();
        const requestToken = data?.request_token;
        if (requestToken) {
            window.open(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http:localhost:3000/movies-catalog/sign-in/approved`,
                '_self'
            );
        } else {
            window.alert('Error');
        }
    };

    const onCreateSessionClickHandler = async () => {
        const url = window.location.href;
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const requestToken = urlSearchParams.get('request_token');
        console.log(requestToken);

        if (requestToken) {
            const data = await Auth.createSession(requestToken);
            console.log(data);
        } else {
            window.alert('Error');
        }
    };

    return (
        <div className={styles.homePage}>
            <button onClick={onCreateRequestTokenButtonClickHandler}>Create request token</button>
            <button onClick={onCreateSessionClickHandler}>Create session</button>
        </div>
    );
};
