import $api from '../../configs/api/interceptors';
import { IMediaList } from '../../configs/interfaces/media-lists.interfaces';

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

    static async getLists(sessionOrAccountId: string, page: number) {
        return $api.get<IMediaList>(`https://api.themoviedb.org/3/account/${sessionOrAccountId}/lists`, {
            params: { page: page.toString() }
        });
    }

    static async getCollection(
        collection: 'watchlist' | 'favorite' | 'rated',
        moviesOrTvOrEpisodes: 'movies' | 'tv' | 'tv/episodes',
        sessionOrAccountId: string,
        language: string,
        page: number,
        sorting: SortingType
    ) {
        return $api.get<IMediaList>(
            `https://api.themoviedb.org/3/account/${sessionOrAccountId}/${collection}/${moviesOrTvOrEpisodes}`,
            {
                params: {
                    language: language,
                    page: page.toString(),
                    sort_by: sorting
                }
            }
        );
    }
}
