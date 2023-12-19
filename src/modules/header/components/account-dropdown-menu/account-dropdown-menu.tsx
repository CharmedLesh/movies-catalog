import { FC } from 'react';
import { useUser } from '../../../../services/hooks/store-hooks';

export const AccountDropdownMenu: FC = () => {
    const { isUser, user } = useUser();

    return <div>{isUser ? <div>{user?.username}</div> : <div>user data not found</div>}</div>;
};
