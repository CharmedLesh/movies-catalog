import { $apiV3 } from '../../interceptor';
import {
    IMoviesCollection,
    IMoviesRatedCollection,
    ITVCollection,
    ITVRatedCollection
} from '../../../../interfaces/media.interfaces';
import {
    IAccountDetails,
    IAddOrRemoveFavoriteItem,
    IAddOrRemoveWatchlistItem
} from '../../../../interfaces/account.interfaces';
import { SortingTypeV3 } from '../../../../interfaces/shared.interfaces';

export class AccountPromises {
    static async getAccountDetails(sessionOrAccountId: string) {
        return $apiV3.get<IAccountDetails>(`/account/${sessionOrAccountId}`);
    }

    static async getMoviesFavoriteCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<IMoviesCollection>(`/account/${sessionIdOrAccountId}/favorite/movies`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }

    static async getTVFavoriteCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<ITVCollection>(`/account/${sessionIdOrAccountId}/favorite/tv`, {
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
        return $apiV3.post<IAddOrRemoveFavoriteItem>(`/account/${sessionIdOrAccountId}/favorite`, {
            headers: { 'content-type': 'application/json' },
            data: { media_type: mediaType, media_id: mediaId, favorite: isFavorite }
        });
    }

    static async getMoviesWatchlistCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<IMoviesCollection>(`/account/${sessionIdOrAccountId}/watchlist/movies`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }

    static async getTVWatchlistCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<ITVCollection>(`/account/${sessionIdOrAccountId}/watchlist/tv`, {
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
        return $apiV3.post<IAddOrRemoveWatchlistItem>(`/account/${sessionIdOrAccountId}/watchlist`, {
            headers: { 'content-type': 'application/json' },
            data: { media_type: mediaType, media_id: mediaId, watchlist: isWatchlist }
        });
    }

    static async getMoviesRatedCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<IMoviesRatedCollection>(`/account/${sessionIdOrAccountId}/rated/movies`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }

    static async getTVRatedCollection(
        sessionIdOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingTypeV3
    ) {
        return $apiV3.get<ITVRatedCollection>(`/account/${sessionIdOrAccountId}/rated/tv`, {
            params: {
                language: language,
                page: page.toString(),
                sort_by: sorting
            }
        });
    }
}
