import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnTabMenu } from '../../../../ui/menus';

export const NavMenu: FC = () => {
    const { pathname } = useLocation();

    const baseUrl = pathname.split('edit')[0] + 'edit';
    const itemsUrl = `${baseUrl}/items`;
    const deleteUrl = `${baseUrl}/delete`;

    const options = [
        {
            text: 'List Info',
            url: baseUrl,
            isEnd: true
        },
        {
            text: 'List Items',
            url: itemsUrl,
            isEnd: true
        },
        {
            text: 'Delete List',
            url: deleteUrl,
            isEnd: true
        }
    ];

    return <ColumnTabMenu menuHeaderText="Edit" tabDataArray={options} />;
};
