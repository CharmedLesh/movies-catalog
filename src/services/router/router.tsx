import { FC, useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSession } from '../hooks/store-hooks';
import { updateSession, removeSession } from '../store/slices/session-slice';
import { AccountListsGrid, CreateListForm } from '../../modules';
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
    AccountListPage,
    RootPage
} from '../../pages';

interface IPrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute: FC<IPrivateRouteProps> = (props) => {
    const { element } = props;
    const { isSession } = useSession();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateSession());
    });

    // check authentication status and redirect if necessary
    useEffect(() => {
        if (!isSession) {
            dispatch(removeSession());
            navigate('/sign-in');
        }
    }, [isSession]);

    // render if user is authenticated, otherwise redirect
    return isSession ? <>{element}</> : null;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootPage />}>
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
