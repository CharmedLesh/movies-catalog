import { FC, useEffect, useState } from 'react';
import { Logger } from '../../services/logger/logger';
import { AuthPromises } from '../../services/auth/auth-promises';
import { useAppDispatch, useUser } from '../../services/hooks/store-hooks';
import { getSessionId } from '../../services/store/async-thunks/user-async-thunks';
import { getRequestTokenFromUrl } from './helpers/get-request-token-from-url';
import { simpleRequest } from '../../helpers/simple-request';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { ActionButton } from './components/action-button/action-button';
import { Loader } from './components/loader/loader';
import styles from './sign-in-page.module.scss';

export const SignInPage: FC = () => {
    const dispatch = useAppDispatch();
    // fix required: on status change to resolve - redirect user to home in 5 seconds
    const { status, error } = useUser();

    const [requestToken, setRequstToken] = useState<string | null>(getRequestTokenFromUrl());

    useEffect(() => {
        if (requestToken) {
            dispatch(getSessionId(requestToken));
        }
    }, []);

    const createRequestToken = async () => {
        const data = await simpleRequest(AuthPromises.getRequestToken());
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

    const onActionButtonClickHandler = async () => {
        await createRequestToken();
    };

    const generatePageContent = () => {
        if (requestToken) {
            return <Loader status={status} error={error} />;
        }

        return <Disclaimer actionButton={<ActionButton onClick={onActionButtonClickHandler} />} />;
    };

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInPageContent}>{generatePageContent()}</div>
        </div>
    );
};
