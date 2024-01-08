import { ICommonActionResponse, IUserBaseInfo } from './shared.interfaces';

///////////////// ACCOUNT INFO RESPONSES /////////////////
export interface IAccountDetails extends IUserBaseInfo {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: null | string;
        };
    };
    iso_639_1: string;
    iso_3166_1: string;
    include_adult: boolean;
}

///////////////// ACCOUNT ACTIONS RESPONSES /////////////////
export interface IAddOrRemoveFavoriteItem extends ICommonActionResponse {}
export interface IAddOrRemoveWatchlistItem extends ICommonActionResponse {}
