import axios from 'axios';
import { Logger } from '../logger/logger';

interface ICommonAccountPostResponeData {
    success: boolean;
    status_code: number;
    status_message: string;
}

interface IAddFavorite extends ICommonAccountPostResponeData {}
interface IAddToWatchlist extends ICommonAccountPostResponeData {}

export class AccountRequests {
    static addFavorite = async (
        sessionId: string,
        mediaType: 'movie' | 'tv',
        mediaId: number,
        isFavourite: boolean
    ) => {
        const options = {
            method: 'POST',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite`,
            params: {
                session_id: sessionId
            },
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            },
            data: { media_type: mediaType, media_id: mediaId, favorite: isFavourite }
        };

        try {
            const response = await axios.request<IAddFavorite>(options);
            const data = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static addToWatchlist = async (
        sessionId: string,
        mediaType: 'movie' | 'tv',
        mediaId: number,
        isWatchlist: boolean
    ) => {
        const options = {
            method: 'POST',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/watchlist`,
            params: {
                session_id: sessionId
            },
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            },
            data: { media_type: mediaType, media_id: mediaId, watchlist: isWatchlist }
        };

        try {
            const response = await axios.request<IAddToWatchlist>(options);
            const data = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };
}
