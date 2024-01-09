import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AccountWatchlistPage: FC = () => {
    const navigate = useNavigate();

    // Redirect if the user accesses /watchlist
    useEffect(() => {
        if (window.location.pathname === '/account/watchlist') {
            navigate('/account/watchlist/movies');
        }
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};
