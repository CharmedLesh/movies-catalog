import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';

const $api = axios.create({
    baseURL: API_URL
});

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`;
    config.headers.accept = 'application/json';
    return config;
});

export default $api;
