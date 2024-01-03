import { FC, useEffect } from 'react';
import { Outlet, Route, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSessionId, useUser } from '../hooks/store-hooks';
import { removeUser } from '../store/slices/user-slice';
import { getAccountDetails } from '../store/async-thunks/user-async-thunks';
import { AccountListsGrid, FooterModule, HeaderModule } from '../../modules';
import {
    AccountFavoritePage,
    AccountRatedPage,
    AccountWatchlistPage,
    ErrorPage,
    HomePage,
    SignInPage,
    AccountPage,
    AccountOverviewPage,
    AccountListsPage,
    AccountListPage
} from '../../pages';
import { CreateListForm } from '../../modules/create-list-form/create-list-form';

const Root: FC = () => {
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

interface IPrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute: FC<IPrivateRouteProps> = (props) => {
    const { element } = props;
    const { isSessionId } = useSessionId();
    const navigate = useNavigate();

    // check authentication status and redirect if necessary
    useEffect(() => {
        if (!isSessionId) {
            navigate('/sign-in');
        }
    }, [isSessionId]);

    // render if user is authenticated, otherwise redirect
    return isSessionId ? <>{element}</> : null;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/account" element={<PrivateRoute element={<AccountPage />} />}>
                <Route index element={<AccountOverviewPage />} />
                <Route path="lists" element={<AccountListsPage />}>
                    <Route index element={<AccountListsGrid />} />
                    <Route path="create" element={<CreateListForm />} />
                    <Route path=":id" element={<AccountListPage />} />
                </Route>
                <Route path="watchlist" element={<AccountWatchlistPage />}>
                    <Route path="movies" element={<div>Account Watchlist Movies</div>} />
                    <Route path="tv" element={<div>Account Watchlist TV</div>} />
                </Route>
                <Route path="rated" element={<AccountRatedPage />}>
                    <Route path="movies" element={<div>Account Rated Movies</div>} />
                    <Route path="tv" element={<div>Account Rated TV</div>} />
                </Route>
                <Route path="favorite" element={<AccountFavoritePage />}>
                    <Route path="movies" element={<div>Account Favorite Movies</div>} />
                    <Route path="tv" element={<div>Account Favorite TV</div>} />
                </Route>
            </Route>
        </Route>
    )
);
