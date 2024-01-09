import { FC } from 'react';
import { useUser } from '../../services/hooks/store-hooks';
import { EssentialInfo } from './components/essential-info/essential-info';
import { InfoItemsGrid } from './components/info-items-grid/info-items-grid';
import { ErrorBanner } from '../../components';

export const AccountOverview: FC = () => {
    const { status } = useUser();

    return status !== 'rejected' ? (
        <>
            <EssentialInfo />
            <InfoItemsGrid />
        </>
    ) : (
        <ErrorBanner errorDescription="User data not found" errorInfo="Try to re-enter to your account" />
    );
};
