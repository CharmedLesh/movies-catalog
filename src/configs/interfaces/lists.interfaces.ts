import { IMediaItem } from './media.interfaces';
import { ICollectionSkeleton, ICommonActionResponse, IUserBaseInfo, SortingTypeV4 } from './shared.interfaces';

///////////////// LISTS ENTITIES /////////////////
export interface IListGeneralInfo {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: 'movie' | 'tv';
    name: string;
    poster_path: null | string;
}

// for v4 api
interface IComments {
    [key: `${'movie' | 'tv'}:${number}`]: string | null;
}

export interface IListDetails {
    average_rating: number;
    backdrop_path: null | string;
    comments: IComments | {};
    object_ids: {}; // ?
    public: boolean;
    revenue: number;
    runtime: number;
    sort_by: SortingTypeV4;
    created_by: IUserBaseInfo & {
        avatar_path: string;
        gravatar_hash: string;
    };
    description: string;
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    item_count: number;
    name: string;
    page: number;
    poster_path: null | string;
    total_pages: number;
    total_results: number;
    results: IMediaItem[];
}

///////////////// COOLLECTIONS ENTITIES /////////////////
export interface IListsCollection extends ICollectionSkeleton {
    results: IListGeneralInfo[];
}

///////////////// LISTS ACTIONS RESPONSES /////////////////
export interface ICreateMediaListResponse extends ICommonActionResponse {
    list_id: number;
}
export interface IAddMediaItemToListResponse extends ICommonActionResponse {}
export interface IRemoveMediaItemFromListResponse extends ICommonActionResponse {}
export interface IClearAllItemsInListResponse extends ICommonActionResponse {}
export interface IDeleteListResponse extends ICommonActionResponse {}

export interface ICheckIfMediaItemInListResponse {
    id: string;
    item_present: boolean;
}
