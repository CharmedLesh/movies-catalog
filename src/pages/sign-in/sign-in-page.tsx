import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSessionId } from '../../services/hooks/store-hooks';
import { getSessionId } from '../../services/store/async-thunks/session-async-thunks';
import { AuthPromises } from '../../services/auth/auth-promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { ActionButton } from './components/action-button/action-button';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { Loader } from './components/loader/loader';
import styles from './sign-in-page.module.scss';

export const SignInPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isSessionId, status, error } = useSessionId();

    const [isRequestTokenPending, setIsRequestTokenPending] = useState(false);

    const getRequestTokenFromUrl = (): string | null => {
        const url = window.location.href;
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const requestToken = urlSearchParams.get('request_token');

        return requestToken;
    };

    const requestToken: string | null = getRequestTokenFromUrl();

    // get session id if request token found and session id not found
    useEffect(() => {
        if (!isSessionId && requestToken) {
            dispatch(getSessionId(requestToken));
        }
    }, []);

    useEffect(() => {
        if (status === 'resolved') {
            let timer: NodeJS.Timeout;

            timer = setTimeout(() => {
                navigate('/account');
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [status]);

    const getRequestToken = async () => {
        const data = await requestWithNotificationsAndPendingSetter(
            dispatch,
            AuthPromises.getRequestToken(),
            setIsRequestTokenPending,
            false
        );
        const requestToken = data?.request_token;
        if (requestToken) {
            window.open(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.REACT_APP_URL_HOST}/sign-in`,
                '_self'
            );
        }
    };

    const onActionButtonClickHandler = async () => {
        await getRequestToken();
    };

    return (
        <div className={styles.wrapper}>
            {!status && (
                <div className={`${styles.content} ${styles.bannerWrapper}`}>
                    <Disclaimer
                        actionButton={
                            <ActionButton onClick={onActionButtonClickHandler} disabled={isRequestTokenPending} />
                        }
                    />
                </div>
            )}
            {status && (
                <div className={styles.content}>
                    <Loader status={status} error={error} />
                </div>
            )}
        </div>
    );
};
