import { FC } from 'react';
import { ListDetails } from '../../modules';

export const AccountListIndexPage: FC = () => {
    const listId = Number(window.location.pathname.split('/')[3]);

    return <ListDetails listId={listId} isEditable={true} />;
};
