import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AccountRatedPage: FC = () => {
    const navigate = useNavigate();

    // Redirect if the user accesses /rated
    useEffect(() => {
        if (window.location.pathname === '/account/rated') {
            navigate('/account/rated/movies');
        }
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};
