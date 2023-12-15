import { AxiosResponse } from 'axios';
import $api from '../../configs/api/interceptors';

interface IGetDetailsResponse {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmbd: {
            avatar_path: null | string;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}

export class AccountPromises {
    static async getAccountDetails(sessionId: string) {
        return $api.get<IGetDetailsResponse>(`https://api.themoviedb.org/3/account/${sessionId}`);
    }
}
