import { ICommonActionResponse } from './shared.interfaces';

///////////////// AUTH RESPONSES /////////////////
export interface IGetRequestTokenResponse extends ICommonActionResponse {
    request_token: string;
}

export interface IGetAccessTokenResponse extends ICommonActionResponse {
    access_token: string;
    account_id: string;
}

export interface IGetSessionIdResponse {
    success: boolean;
    session_id: string;
}

///////////////// AUTH LOCALSTORAGE /////////////////
export interface ISessionData {
    accessToken: string;
    accountId: string;
    sessionId: string;
}
