import $api from '../../configs/api/interceptors';
import {
    IListsCollection,
    IListDetails,
    ICreateMediaListResponse,
    IAddMediaItemToListResponse,
    IRemoveMediaItemFromListResponse,
    ICheckIfMediaItemInListResponse,
    IClearAllItemsInListResponse,
    IDeleteListResponse
} from '../../configs/interfaces/media-lists.interfaces';

export class ListsPromises {
    static async getListsCollection(sessionOrAccountId: string, page: number) {
        return $api.get<IListsCollection>(`https://api.themoviedb.org/3/account/${sessionOrAccountId}/lists`, {
            params: { page: page.toString() }
        });
    }

    static async getListDetails(listId: number, language: string, page: number) {
        return $api.get<IListDetails>(`https://api.themoviedb.org/3/list/${listId.toString()}`, {
            params: { language: language, page: page.toString() }
        });
    }

    static async createList(sessionId: string, name: string, description: string, language: string) {
        return $api.post<ICreateMediaListResponse>('https://api.themoviedb.org/3/list', {
            headers: { 'content-type': 'application/json' },
            params: { session_id: sessionId },
            data: { name: name, description: description, language: language }
        });
    }

    static async addMediaItemToList(sessionId: string, listId: number, mediaItemId: number) {
        return $api.post<IAddMediaItemToListResponse>(
            `https://api.themoviedb.org/3/list/${listId.toString()}/add_item`,
            {
                headers: { 'content-type': 'application/json' },
                params: { session_id: sessionId },
                data: { media_id: mediaItemId }
            }
        );
    }

    static async removeMediaItemFromList(sessionId: string, listId: number, mediaItemId: number) {
        return $api.post<IRemoveMediaItemFromListResponse>(
            `https://api.themoviedb.org/3/list/${listId.toString()}/remove_item`,
            {
                headers: { 'content-type': 'application/json' },
                params: { session_id: sessionId },
                data: { media_id: mediaItemId }
            }
        );
    }

    // usage example: check if item has already been added to the list
    static async checkIfMediaItemInList(listId: number, movieId: number) {
        return $api.get<ICheckIfMediaItemInListResponse>(
            `https://api.themoviedb.org/3/list/${listId.toString()}/item_status`,
            {
                data: { movie_id: movieId }
            }
        );
    }

    static async clearAllItemsInList(sessionId: string, listId: number, isConfirmed: boolean) {
        return $api.post<IClearAllItemsInListResponse>(`https://api.themoviedb.org/3/list/${listId.toString()}/clear`, {
            params: { session_id: sessionId, confirm: isConfirmed }
        });
    }

    static async deleteList(sessionId: string, listId: number) {
        return $api.post<IDeleteListResponse>(`https://api.themoviedb.org/3/list/${listId.toString()}`, {
            params: { session_id: sessionId }
        });
    }
}
