import axios from 'axios';

const API_V3_URL = 'https://api.themoviedb.org/3';
const API_V4_URL = 'https://api.themoviedb.org/4';

export const $apiV3 = axios.create({
    baseURL: API_V3_URL
});

export const $apiV4 = axios.create({
    baseURL: API_V4_URL
});

$apiV3.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`;
    config.headers.accept = 'application/json';
    return config;
});

$apiV4.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`;
    config.headers.accept = 'application/json';
    return config;
});
