import { ICollectionSkeleton } from './shared.interfaces';

///////////////// MEDIA ITEMS ENTITIES /////////////////
export interface IMovieItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type: 'movie' | 'tv';
}

export interface ITVItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    media_type: 'movie' | 'tv';
}

export interface IMediaItem {
    name?: string;
    title?: string;
    origin_country?: string[];
    original_name?: string;
    original_title?: string;
    first_air_date?: string;
    release_date?: string;
    video?: boolean;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    media_type: 'movie' | 'tv';
}

interface IMovieItemRated extends IMovieItem {
    rating: number;
}

interface ITVItemRated extends ITVItem {
    rating: number;
}

///////////////// COOLLECTIONS ENTITIES /////////////////
export interface IMoviesCollection extends ICollectionSkeleton {
    results: IMovieItem[];
}

export interface ITVCollection extends ICollectionSkeleton {
    results: ITVItem[];
}

export interface IMoviesRatedCollection extends ICollectionSkeleton {
    results: IMovieItemRated[];
}

export interface ITVRatedCollection extends ICollectionSkeleton {
    results: ITVItemRated[];
}
