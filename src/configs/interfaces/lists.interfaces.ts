import { IMovieItem, ITVItem } from './media.interfaces';
import { ICollectionSkeleton, ICommonActionResponse } from './shared.interfaces';

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

export interface IListDetails {
    created_by: string;
    description: string;
    favorite_count: number;
    id: number;
    iso_639_1: string;
    item_count: number;
    name: string;
    page: number;
    poster_path: null | string;
    total_pages: number;
    total_results: number;
    items: IMovieItem[] | ITVItem[];
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
