import { FC } from 'react';
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
    AccountFavoritePage,
    AccountRatedPage,
    AccountWatchlistPage,
    ErrorPage,
    HomePage,
    SignInPage,
    AccountPage,
    AccountOverviewPage,
    AccountListsPage
} from '../../pages';
import { FooterModule, HeaderModule } from '../../modules';

const Root: FC = () => {
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

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/account" element={<AccountPage />}>
                <Route path="overview" element={<AccountOverviewPage />} />
                <Route path="lists" element={<AccountListsPage />} />
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

// todo
// fetch data in loader
