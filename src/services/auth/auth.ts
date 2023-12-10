import axios from 'axios';
import { Logger } from '../logger/logger';

interface ICreateRequestTokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
}

interface ICreateSession {
    success: boolean;
    session_id: string;
}

interface ICreateGuestSession {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
}

export class Auth {
    static createRequestToken = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/authentication/token/new',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: ICreateRequestTokenResponse = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static createSession = async (requestToken: string) => {
        const options = {
            method: 'POST',
            url: 'https://api.themoviedb.org/3/authentication/session/new',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
                'content-type': 'application/json'
            },
            data: { request_token: requestToken }
        };

        try {
            const response = await axios.request(options);
            const data: ICreateSession = response.data;
            return data;
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };

    static createGuestSession = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/authentication/guest_session/new',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
            }
        };

        try {
            const response = await axios.request(options);
            const data: ICreateGuestSession = response.data;
            return data;
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };
}
