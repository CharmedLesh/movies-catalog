import { AxiosResponse } from 'axios';
import $api from '../../configs/api/interceptors';

interface IGetRequestTokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
}

interface IGetSessionIdResponse {
    success: boolean;
    session_id: string;
}

interface IGetGuestSessionIdResponse {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
}

export class AuthPromises {
    static async getRequestToken(): Promise<AxiosResponse<IGetRequestTokenResponse>> {
        return $api.get<IGetRequestTokenResponse>('/authentication/token/new');
    }

    static async getSessionId(requestToken: string): Promise<AxiosResponse<IGetSessionIdResponse>> {
        return $api.post<IGetSessionIdResponse>('/authentication/session/new', { request_token: requestToken });
    }

    static async getGuestSessionId(): Promise<AxiosResponse<IGetGuestSessionIdResponse>> {
        return $api.get<IGetGuestSessionIdResponse>('/authentication/guest_session/new');
    }
}
