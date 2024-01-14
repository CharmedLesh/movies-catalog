import { AxiosResponse } from 'axios';
import { $apiV3, $apiV4, $apiV4NoAccessToken } from '../../interceptor';
import {
    IListsGeneralInfoCollection,
    IListDetailsCollection,
    ICreateMediaListResponse,
    IAddMediaItemToListResponse,
    IRemoveMediaItemFromListResponse,
    ICheckIfMediaItemInListResponse,
    IClearAllItemsInListResponse,
    IDeleteListResponse
} from '../../../../configs/interfaces/lists.interfaces';

export class ListsPromises {
    static async getListsCollection(
        accountId: string,
        page: number
    ): Promise<AxiosResponse<IListsGeneralInfoCollection>> {
        return $apiV4.get<IListsGeneralInfoCollection>(`/account/${accountId}/lists`, {
            params: { page: page.toString() }
        });
    }

    static async getListDetails(
        listId: number,
        page: number,
        language?: string
    ): Promise<AxiosResponse<IListDetailsCollection>> {
        return $apiV4.get<IListDetailsCollection>(`/list/${listId.toString()}`, {
            params: { language: language ? language : 'en-US', page: page.toString() }
        });
    }

    static async createList(
        accessToken: string,
        name: string,
        description: string,
        iso_3166_1: string,
        iso_639_1: string,
        isPublic: boolean
    ): Promise<AxiosResponse<ICreateMediaListResponse>> {
        return $apiV4NoAccessToken.post<ICreateMediaListResponse>(
            '/list',
            {
                name: name,
                description: description,
                iso_3166_1: iso_3166_1,
                iso_639_1: iso_639_1,
                public: isPublic
            },
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
    }

    static async addMediaItemToList(
        sessionId: string,
        listId: number,
        mediaItemId: number
    ): Promise<AxiosResponse<IAddMediaItemToListResponse>> {
        return $apiV3.post<IAddMediaItemToListResponse>(
            `/list/${listId.toString()}/add_item`,
            {
                media_id: mediaItemId
            },
            {
                headers: { 'content-type': 'application/json' },
                params: { session_id: sessionId }
            }
        );
    }

    static async removeMediaItemFromList(
        sessionId: string,
        listId: number,
        mediaItemId: number
    ): Promise<AxiosResponse<IRemoveMediaItemFromListResponse>> {
        return $apiV3.post<IRemoveMediaItemFromListResponse>(
            `/list/${listId.toString()}/remove_item`,
            {
                media_id: mediaItemId
            },
            {
                headers: { 'content-type': 'application/json' },
                params: { session_id: sessionId }
            }
        );
    }

    // usage example: check if item has already been added to the list
    static async checkIfMediaItemInList(
        listId: number,
        movieId: number
    ): Promise<AxiosResponse<ICheckIfMediaItemInListResponse>> {
        return $apiV3.get<ICheckIfMediaItemInListResponse>(`/list/${listId.toString()}/item_status`, {
            data: { movie_id: movieId }
        });
    }

    static async clearAllItemsInList(
        sessionId: string,
        listId: number,
        isConfirmed: boolean
    ): Promise<AxiosResponse<IClearAllItemsInListResponse>> {
        return $apiV3.post<IClearAllItemsInListResponse>(`/list/${listId.toString()}/clear`, {
            params: { session_id: sessionId, confirm: isConfirmed }
        });
    }

    static async deleteList(sessionId: string, listId: number): Promise<AxiosResponse<IDeleteListResponse>> {
        return $apiV3.post<IDeleteListResponse>(`/list/${listId.toString()}`, {
            params: { session_id: sessionId }
        });
    }
}
