import { AnchorHTMLAttributes, FC } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = () => {
    return (
        <Link to="/movies-catalog/reset-password" title="Reset password">
            Forgot password?
        </Link>
    );
};
