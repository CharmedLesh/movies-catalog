import { IMediaItem } from './media.interfaces';
import {
    ICommonActionResponse,
    IPageNumberDependingCollection,
    IUserBaseInfo,
    SortingTypeV4
} from './shared.interfaces';

///////////////// LISTS ENTITIES /////////////////
export interface IListGeneralInfo {
    account_object_id: string;
    adult: 0 | 1;
    average_rating: number;
    backdrop_path: string | null;
    created_at: string;
    description: string;
    featured: number;
    id: number;
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    number_of_items: number;
    poster_path: string | null;
    public: 0 | 1;
    revenue: number;
    runtime: string;
    sort_by: number;
    updated_at: string;
}

export interface IComments {
    [key: `${'movie' | 'tv'}:${number}`]: string | null;
}

export interface IListDetailsWithoutPageDependingData {
    average_rating: number;
    backdrop_path: null | string;
    object_ids: {};
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
    poster_path: null | string;
}

///////////////// COOLLECTIONS ENTITIES /////////////////
export interface IListsGeneralInfoCollection extends IPageNumberDependingCollection<IListGeneralInfo> {}

export interface IListDetailsCollection
    extends IListDetailsWithoutPageDependingData,
        IPageNumberDependingCollection<IMediaItem> {}

///////////////// LISTS ACTIONS RESPONSES /////////////////
export interface ICreateMediaListResponse extends ICommonActionResponse {
    id: number;
}
export interface IAddMediaItemToListResponse extends ICommonActionResponse {}
export interface IRemoveMediaItemFromListResponse extends ICommonActionResponse {}
export interface IClearAllItemsInListResponse extends ICommonActionResponse {}
export interface IDeleteListResponse extends ICommonActionResponse {}

export interface ICheckIfMediaItemInListResponse {
    id: string;
    item_present: boolean;
}
