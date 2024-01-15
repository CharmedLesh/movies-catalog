import { FC } from 'react';
import { TabMenu } from '../../../../ui/menus';

export const Menu: FC = () => {
    const baseUrl = '/account';
    const listsUrl = `${baseUrl}/lists`;
    const watchlistUrl = `${baseUrl}/watchlist`;
    const ratedUrl = `${baseUrl}/rated`;
    const favoritesUrl = `${baseUrl}/favorites`;

    const options = [
        {
            text: 'Overview',
            url: baseUrl,
            isEnd: true
        },
        {
            text: 'Lists',
            url: listsUrl,
            isEnd: false
        },
        {
            text: 'Watchlist',
            url: watchlistUrl,
            isEnd: false
        },
        {
            text: 'Rated',
            url: ratedUrl,
            isEnd: false
        },
        {
            text: 'Favorites',
            url: favoritesUrl,
            isEnd: false
        }
    ];

    return <TabMenu tabDataArray={options} />;
};
