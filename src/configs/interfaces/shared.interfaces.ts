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
