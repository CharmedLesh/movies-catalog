import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useSessionId, useUser } from '../../services/hooks/store-hooks';
import { removeUser } from '../../services/store/slices/user-slice';
import { getAccountDetails } from '../../services/store/async-thunks/user-async-thunks';
import { FooterModule, HeaderModule } from '../../modules';

export const RootPage: FC = () => {
    const dispatch = useAppDispatch();
    const { sessionId } = useSessionId();
    const { isUser } = useUser();

    // get user data if session id found
    useEffect(() => {
        if (sessionId && !isUser) {
            dispatch(getAccountDetails(sessionId));
        }
        if (!sessionId && isUser) {
            dispatch(removeUser());
        }
    }, [sessionId]);

    return (
        <>
            <HeaderModule />
            <div className="page-content-wrapper">
                <Outlet />
            </div>
            <FooterModule />
        </>
    );
};
