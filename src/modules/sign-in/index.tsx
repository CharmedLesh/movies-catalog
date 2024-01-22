import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSession } from '../../services/hooks/store-hooks';
import { createSession } from '../../services/store/async-thunks/session-async-thunks';
import { removeSessionStatus } from '../../services/store/slices/session-slice';
import { AuthPromises } from '../../services/api/promises';
import { LocalStorageExpirable } from '../../services/localstorage/localstorage-expirable';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { ActionButton } from './components/action-button/action-button';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { Loader } from './components/loader/loader';
import styles from './index.module.scss';

export const SignIn: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useSession();

    const requestTokenLocalstorage = new LocalStorageExpirable<string>({
        key: 'REQUEST_TOKEN',
        expirationTimeInMinutes: 15
    });
    const requestToken = requestTokenLocalstorage.get();

    const [isRequestTokenPending, setIsRequestTokenPending] = useState(requestToken ? true : false);

    // get session id if request token found and session id not found
    useEffect(() => {
        if (requestToken) {
            getAccessToken(requestToken);
        }
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (status === 'resolved') {
            timer = setTimeout(() => {
                navigate('/account');
            }, 3000);
        }
        if (status === 'rejected') {
            timer = setTimeout(() => {
                setIsRequestTokenPending(false);
                dispatch(removeSessionStatus());
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [status]);

    const getRequestToken = async () => {
        const data = await requestWithNotificationsAndPendingSetter(
            AuthPromises.getRequestToken(),
            setIsRequestTokenPending,
            false
        );
        const requestToken = data?.request_token;
        if (requestToken) {
            requestTokenLocalstorage.set(requestToken);
            window.open(`https://www.themoviedb.org/auth/access?request_token=${requestToken}`, '_self');
        }
    };

    const getAccessToken = async (requestToken: string) => {
        dispatch(createSession(requestToken));
        requestTokenLocalstorage.remove();
    };

    const onActionButtonClickHandler = async () => {
        await getRequestToken();
    };

    return !status ? (
        <div className={`${styles.content} ${styles.bannerWrapper}`}>
            <Disclaimer
                actionButton={
                    <ActionButton
                        onClick={onActionButtonClickHandler}
                        disabled={isRequestTokenPending}
                        value="SIGN IN"
                    />
                }
            />
        </div>
    ) : (
        <div className={styles.content}>
            <Loader status={status} error={error} />
        </div>
    );
};

// todo
// use sessionstorage instead of localstorage for request token
