import $api from '../../configs/api/interceptors';
import {
    IMoviesCollection,
    IMoviesRatedCollection,
    ITVCollection,
    ITVRatedCollection,
    IAddOrRemoveFavoriteItem,
    IAddOrRemoveWatchlistItem
} from '../../configs/interfaces/media-lists.interfaces';

type SortingType = 'created_at.asc' | 'created_at.desc';

interface IDetails {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
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

export class AccountPromises {
    static async getAccountDetails(sessionOrAccountId: string) {
        return $api.get<IDetails>(`https://api.themoviedb.org/3/account/${sessionOrAccountId}`);
    }

    static async getMoviesFavoriteCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<IMoviesCollection>(
            `https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/favorite/movies`,
            {
                params: {
                    language: language,
                    page: page.toString(),
                    sort_by: sorting
                }
            }
        );
    }

    static async getTVFavoriteCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<ITVCollection>(`https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/favorite/tv`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }

    static async addOrRemoveFavoriteItem(
        sessionIdOrAccountId: string,
        mediaType: 'movie' | 'tv',
        mediaId: number,
        isFavorite: boolean
    ) {
        return $api.post<IAddOrRemoveFavoriteItem>(
            `https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/favorite`,
            {
                headers: { 'content-type': 'application/json' },
                data: { media_type: mediaType, media_id: mediaId, favorite: isFavorite }
            }
        );
    }

    static async getMoviesWatchlistCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<IMoviesCollection>(
            `https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/watchlist/movies`,
            {
                params: {
                    language: language,
                    page: page.toString(),
                    sort_by: sorting
                }
            }
        );
    }

    static async getTVWatchlistCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<ITVCollection>(`https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/watchlist/tv`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }

    static async addOrRemoveWatchlistItem(
        sessionIdOrAccountId: string,
        mediaType: 'movie' | 'tv',
        mediaId: number,
        isWatchlist: boolean
    ) {
        return $api.post<IAddOrRemoveWatchlistItem>(
            `https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/watchlist`,
            {
                headers: { 'content-type': 'application/json' },
                data: { media_type: mediaType, media_id: mediaId, watchlist: isWatchlist }
            }
        );
    }

    static async getMoviesRatedCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<IMoviesRatedCollection>(
            `https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/rated/movies`,
            {
                params: {
                    language: language,
                    page: page.toString(),
                    sort_by: sorting
                }
            }
        );
    }

    static async getTVRatedCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<ITVRatedCollection>(`https://api.themoviedb.org/3/account/${sessionIdOrAccountId}/rated/tv`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }
}
