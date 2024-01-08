import { AxiosResponse } from 'axios';
import { $apiV3, $apiV4 } from '../../interceptor';
import {
    IListsCollection,
    IListDetails,
    ICreateMediaListResponse,
    IAddMediaItemToListResponse,
    IRemoveMediaItemFromListResponse,
    ICheckIfMediaItemInListResponse,
    IClearAllItemsInListResponse,
    IDeleteListResponse
} from '../../../../configs/interfaces/lists.interfaces';

export class ListsPromises {
    static async getListsCollection(
        sessionOrAccountId: string,
        page: number
    ): Promise<AxiosResponse<IListsCollection>> {
        return $apiV4.get<IListsCollection>(`/account/${sessionOrAccountId}/lists`, {
            params: { page: page.toString() }
        });
    }

    static async getListDetails(listId: number, page: number, language?: string): Promise<AxiosResponse<IListDetails>> {
        return $apiV4.get<IListDetails>(`/list/${listId.toString()}`, {
            params: { language: language ? language : 'en-US', page: page.toString() }
        });
    }

    static async createList(
        sessionId: string,
        name: string,
        description: string,
        language: string
    ): Promise<AxiosResponse<ICreateMediaListResponse>> {
        return $apiV3.post<ICreateMediaListResponse>(
            '/list',
            {
                name: name,
                description: description,
                language: language
            },
            {
                headers: {
                    'content-type': 'application/json'
                },
                params: { session_id: sessionId }
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
