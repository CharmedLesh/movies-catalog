import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useSession, useUser } from '../../services/hooks/store-hooks';
import { removeUser } from '../../services/store/slices/user-slice';
import { getAccountDetails } from '../../services/store/async-thunks/user-async-thunks';
import { FooterModule, HeaderModule } from '../../modules';

export const RootPage: FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { isSession, sessionId } = useSession();
    const { isUser } = useUser();

    // scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // get user data if session found
        if (!isUser && isSession && sessionId) {
            dispatch(getAccountDetails(sessionId));
        }
        // remove user data if session removed
        if (!isSession && isUser) {
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
