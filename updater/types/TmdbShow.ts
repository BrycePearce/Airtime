export interface TmdbResponse {
    results: TmdbShow[];
    total_results: number;
    page: number;
    total_pages: number;
}

export interface TmdbShow {
    popularity: number;
    vote_count: number;
    id: number;
    backdrop_path: string;
    original_name: string;
    genre_ids: string[];
    name: string;
    original_language: string;
    origin_country: string[];
    first_air_date: Date;
    poster_path: string;
    overview: string;
    vote_average: number;
}
