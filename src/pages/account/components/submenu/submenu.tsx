import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { TabMenu } from '../../../../ui/menus';

export const Submenu: FC = () => {
    const { pathname } = useLocation();

    const parts = pathname.split('/');
    const baseUrl = `/account/${parts[2]}`;
    const moviesUrl = `${baseUrl}`;
    const tvUrl = `${baseUrl}/tv`;

    const isMoviesEnd: boolean = parts[3] === 'tv' ? true : false;

    const options = [
        {
            text: 'Movies',
            url: moviesUrl,
            isEnd: isMoviesEnd
        },
        {
            text: 'TV',
            url: tvUrl,
            isEnd: false
        }
    ];

    return <TabMenu tabDataArray={options} />;
};
