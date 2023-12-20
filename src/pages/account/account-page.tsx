import { FC, useEffect, useState } from 'react';
import { Logger } from '../../services/logger/logger';
import { AuthPromises } from '../../services/auth/auth-promises';
import { useAppDispatch, useSessionId } from '../../services/hooks/store-hooks';
import { getSessionId } from '../../services/store/async-thunks/session-async-thunks';
import { simpleRequest } from '../../helpers/simple-request';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { ActionButton } from './components/action-button/action-button';
import { Loader } from './components/loader/loader';
import { AccountDetails } from './components/account-details/account-details';
import styles from './account-page.module.scss';

export const AccountPage: FC = () => {
    const dispatch = useAppDispatch();
    const { status, error, isSessionId } = useSessionId();

    const getRequestTokenFromUrl = (): string | null => {
        const url = window.location.href;
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const requestToken = urlSearchParams.get('request_token');

        return requestToken;
    };

    const requestToken: string | null = getRequestTokenFromUrl();

    const getPageInitialStatus = (): 'unauthorized' | 'authorizing' | 'authorized' => {
        if (isSessionId) {
            return 'authorized';
        } else if (!isSessionId && requestToken) {
            return 'authorizing';
        } else {
            return 'unauthorized';
        }
    };

    const [pageStatus, setPageStatus] = useState<'unauthorized' | 'authorizing' | 'authorized'>(getPageInitialStatus());

    // get session id if request token found and session id not found
    useEffect(() => {
        if (!isSessionId && requestToken) {
            dispatch(getSessionId(requestToken));
        }
    }, []);

    // change page status to authorized if session id exist
    useEffect(() => {
        if (isSessionId) {
            setPageStatus('authorized');
        }
        // if (!isSessionId) {
        //     setPageStatus('unauthorized');
        // }
    }, [isSessionId]);

    const getRequestToken = async () => {
        const data = await simpleRequest(AuthPromises.getRequestToken());
        const requestToken = data?.request_token;
        if (requestToken) {
            window.open(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.REACT_APP_URL_HOST}${process.env.REACT_APP_URL_PATHNAME_CORE}/account/approved`,
                '_self'
            );
        } else {
            Logger.logError('Error occured while trying to get request token');
        }
    };

    const onActionButtonClickHandler = async () => {
        await getRequestToken();
    };

    return (
        <div className={styles.accountPage}>
            <div className={styles.accountPageContent}>
                {pageStatus === 'unauthorized' && (
                    <Disclaimer actionButton={<ActionButton onClick={onActionButtonClickHandler} />} />
                )}
                {pageStatus === 'authorizing' && <Loader status={status} error={error} />}
                {pageStatus === 'authorized' && <AccountDetails />}
            </div>
        </div>
    );
};
