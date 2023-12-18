import { FC } from 'react';
import { useUser } from '../../../../services/hooks/store-hooks';

export const Account: FC = () => {
    const { isUser, status, user } = useUser();

    return <div>{isUser ? <div>{user?.username}</div> : <div>user data not found</div>}</div>;
};
