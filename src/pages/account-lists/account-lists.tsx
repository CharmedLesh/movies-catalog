import { FC } from 'react';
import { TopPanel } from './components/top-panel/top-panel';
import { Outlet } from 'react-router-dom';

export const AccountListsPage: FC = () => {
    return (
        <>
            <TopPanel />
            <div>
                <Outlet />
            </div>
        </>
    );
};
