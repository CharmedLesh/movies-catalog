import { FC } from 'react';
import { EssentialInfo } from './components/essential-info/essential-info';
import { InfoItemsGrid } from './components/info-items-grid/info-items-grid';

export const AccountOverview: FC = () => {
    return (
        <div>
            <EssentialInfo />
            <InfoItemsGrid />
        </div>
    );
};
