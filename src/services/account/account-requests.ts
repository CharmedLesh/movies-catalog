import axios from 'axios';
import { Logger } from '../logger/logger';

interface IGetDetails {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmbd: {
            avatar_path: null | string;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}

interface ICommonAccountPostResponeData {
    success: boolean;
    status_code: number;
    status_message: string;
}

interface IAddFavorite extends ICommonAccountPostResponeData {}
interface IAddToWatchlist extends ICommonAccountPostResponeData {}

interface IMediaItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface ICommonAccountGetResponseData {
    page: number;
    results: IMediaItem[];
    total_pages: number;
    total_results: number;
}

interface IGetFavoriteMovies extends ICommonAccountGetResponseData {}
interface IGetFavoriteTV extends ICommonAccountGetResponseData {}
interface IGetLists extends ICommonAccountGetResponseData {}
interface IGetRatedMovies extends ICommonAccountGetResponseData {}
interface IGetRatedTV extends ICommonAccountGetResponseData {}
interface IGetRatedTVEpisodes extends ICommonAccountGetResponseData {}
interface IGetWatchlistMovies extends ICommonAccountGetResponseData {}
interface IGetWatchlistTV extends ICommonAccountGetResponseData {}

export class AccountRequests {
    static getDetails = async (sessionId: string) => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/account/20805941',
            params: { session_id: sessionId },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetDetails = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static addFavorite = async (
        sessionId: string,
        mediaType: 'movie' | 'tv',
        mediaId: number,
        isFavourite: boolean
    ) => {
        const options = {
            method: 'POST',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/favorite`,
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
            const response = await axios.request(options);
            const data: IAddFavorite = response.data;
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
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/watchlist`,
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
            const response = await axios.request(options);
            const data: IAddToWatchlist = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getFavoriteMovies = async (
        sessionId: string,
        page: number,
        sorting: 'created_at.asc' | 'created_at.desc'
    ) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/favorite/movies`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetFavoriteMovies = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getFavoriteTV = async (sessionId: string, page: number, sorting: 'created_at.asc' | 'created_at.desc') => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/favorite/tv`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetFavoriteTV = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getLists = async (sessionId: string, page: number) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/lists`,
            params: { page: page.toString(), session_id: sessionId },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetLists = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getRatedMovies = async (sessionId: string, page: number, sorting: 'created_at.asc' | 'created_at.desc') => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/rated/movies`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetRatedMovies = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getRatedTV = async (sessionId: string, page: number, sorting: 'created_at.asc' | 'created_at.desc') => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/rated/tv`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetRatedTV = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getRatedTVEpisodes = async (
        sessionId: string,
        page: number,
        sorting: 'created_at.asc' | 'created_at.desc'
    ) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/rated/tv/episodes`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetRatedTVEpisodes = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getWatchlistMovies = async (
        sessionId: string,
        page: number,
        sorting: 'created_at.asc' | 'created_at.desc'
    ) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/watchlist/movies`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetWatchlistMovies = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static getWatchlistTV = async (sessionId: string, page: number, sorting: 'created_at.asc' | 'created_at.desc') => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMBD_ACCOUNT_ID}/watchlist/tv`,
            params: {
                language: 'en-US',
                page: page.toString(),
                session_id: sessionId,
                sort_by: sorting
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: IGetWatchlistTV = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };
}
