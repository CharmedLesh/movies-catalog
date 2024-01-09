import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AccountFavoritePage: FC = () => {
    const navigate = useNavigate();

    // Redirect if the user accesses /favorite
    useEffect(() => {
        if (window.location.pathname === '/account/favorite') {
            navigate('/account/favorite/movies');
        }
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};
