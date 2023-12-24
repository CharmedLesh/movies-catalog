///////////////// MEDIA ITEMS ENTITIES /////////////////
interface IMovieItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface ITVItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

interface IMovieItemRated extends IMovieItem {
    rating: number;
}

interface ITVItemRated extends ITVItem {
    rating: number;
}

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
interface ICollectionSkeleton {
    page: number;
    total_pages: number;
    total_results: number;
}

export interface IMoviesCollection extends ICollectionSkeleton {
    results: IMovieItem[];
}

export interface ITVCollection extends ICollectionSkeleton {
    results: ITVItem[];
}

export interface IMoviesRatedCollection extends ICollectionSkeleton {
    results: IMovieItemRated[];
}

export interface ITVRatedCollection extends ICollectionSkeleton {
    results: ITVItemRated[];
}

export interface IListsCollection extends ICollectionSkeleton {
    results: IListGeneralInfo[];
}

///////////////// ACTIONS RESPONSES /////////////////
interface ICommonActionResponse {
    success: boolean;
    status_code: number;
    status_message: string;
}

///////////////// ACCOUNT ACTIONS RESPONSES /////////////////
export interface IAddOrRemoveFavoriteItem extends ICommonActionResponse {}
export interface IAddOrRemoveWatchlistItem extends ICommonActionResponse {}

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
