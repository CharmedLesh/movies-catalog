import { AxiosResponse } from 'axios';
import { $apiV3, $apiV4 } from '../../interceptor';
import {
    IGetAccessTokenResponse,
    IGetRequestTokenResponse,
    IGetSessionIdResponse
} from '../../../../interfaces/auth.interfaces';

export class AuthPromises {
    static async getRequestToken(): Promise<AxiosResponse<IGetRequestTokenResponse>> {
        return $apiV4.post<IGetRequestTokenResponse>(
            '/auth/request_token',
            {
                redirect_to: `${process.env.REACT_APP_URL_HOST}/sign-in`
            },
            {
                headers: { 'content-type': 'application/json' }
            }
        );
    }

    static async getAccessToken(requestToken: string) {
        return $apiV4.post<IGetAccessTokenResponse>(
            '/auth/access_token',
            {
                request_token: requestToken
            },
            {
                headers: { 'content-type': 'application/json' }
            }
        );
    }

    static async getSessionId(accessToken: string): Promise<AxiosResponse<IGetSessionIdResponse>> {
        return $apiV3.post<IGetSessionIdResponse>(
            '/authentication/session/convert/4',
            {
                access_token: accessToken
            },
            {
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}
