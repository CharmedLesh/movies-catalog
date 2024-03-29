import { FC, useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSession } from '../hooks/store-hooks';
import { updateSession, removeSession } from '../store/slices/session-slice';
import {
    AccountFavoritesPage,
    AccountRatedPage,
    AccountWatchlistPage,
    ErrorPage,
    RootIndexPage,
    SignInPage,
    AccountPage,
    AccountListsPage,
    AccountListPage,
    AccountListIndexPage,
    AccountListEditPage,
    RootPage,
    AccountListCreatePage,
    AccountIndexPage,
    AccountListsIndexPage,
    ListPage,
    AccountListEditIndexPage,
    AccountListEditItemsPage,
    AccountListEditDeletePage
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
            <Route index element={<RootIndexPage />} />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="account" element={<PrivateRoute element={<AccountPage />} />}>
                <Route index element={<AccountIndexPage />} />
                <Route path="lists" element={<AccountListsPage />}>
                    <Route index element={<AccountListsIndexPage />} />
                    <Route path="create" element={<AccountListCreatePage />} />
                    <Route path=":id" element={<AccountListPage />}>
                        <Route index element={<AccountListIndexPage />} />
                        <Route path="edit" element={<AccountListEditPage />}>
                            <Route index element={<AccountListEditIndexPage />} />
                            <Route path="items" element={<AccountListEditItemsPage />} />
                            <Route path="delete" element={<AccountListEditDeletePage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="watchlist" element={<AccountWatchlistPage />}>
                    <Route index element={<div>Account Watchlist Movies</div>} />
                    <Route path="tv" element={<div>Account Watchlist TV</div>} />
                </Route>
                <Route path="rated" element={<AccountRatedPage />}>
                    <Route index element={<div>Account Rated Movies</div>} />
                    <Route path="tv" element={<div>Account Rated TV</div>} />
                </Route>
                <Route path="favorites" element={<AccountFavoritesPage />}>
                    <Route index element={<div>Account Favorite Movies</div>} />
                    <Route path="tv" element={<div>Account Favorite TV</div>} />
                </Route>
            </Route>
            <Route path="list/:id" element={<ListPage />} />
        </Route>
    )
);

// todo
// add "Return to List" button under navMenu at lists/:id/edit
// mobile design for navMenu at lists/:id/edit
