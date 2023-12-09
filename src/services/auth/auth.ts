import axios from 'axios';
import { Logger } from '../logger/logger';

interface CreateRequestTokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
}

interface CreateSession {
    success: boolean;
    session_id: string;
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
            const data: CreateRequestTokenResponse = response.data;
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
            const data: CreateSession = response.data;
            return data;
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                Logger.logError(error.message);
            }
        }
    };
}
