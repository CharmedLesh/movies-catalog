import { ICommonActionResponse } from './shared.interfaces';

///////////////// AUTH RESPONSES /////////////////
export interface IGetRequestTokenResponse extends ICommonActionResponse {
    request_token: string;
}

export interface IGetAccessTokenResponse extends ICommonActionResponse {
    access_token: string;
}
