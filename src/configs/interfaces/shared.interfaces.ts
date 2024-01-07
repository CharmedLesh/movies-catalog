export type SortingTypeV3 = 'created_at.asc' | 'created_at.desc';
export type SortingTypeV4 =
    | 'original_order.desc'
    | 'original_order.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'title.asc'
    | 'title.desc';

export interface IUserBaseInfo {
    id: number;
    name: string;
    username: string;
}

///////////////// ACTIONS RESPONSES /////////////////
export interface ICommonActionResponse {
    success: boolean;
    status_code: number;
    status_message: string;
}

///////////////// COOLLECTIONS ENTITIES /////////////////
export interface ICollectionSkeleton {
    page: number;
    total_pages: number;
    total_results: number;
}
