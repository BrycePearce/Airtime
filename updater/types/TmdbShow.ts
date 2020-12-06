export interface TmdbResponse {
    results: TmdbShow[];
    total_results: number;
    page: number;
    total_pages: number;
}

export interface TmdbShow {
    backdrop_path: string;
    created_by: any[];
    episode_run_time: number[];
    first_air_date: Date;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: Date;
    last_episode_to_air: TEpisodeToAir;
    name: string;
    next_episode_to_air: TEpisodeToAir;
    external_ids: Externals,
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any[];
    production_countries: any[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

interface Genre {
    id: number;
    name: string;
}

interface TEpisodeToAir {
    air_date: Date;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: null | string;
    vote_average: number;
    vote_count: number;
}

interface Network {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
}

interface Season {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: null | string;
    season_number: number;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface Externals {
    imdb_id?: string;
    tvdb_id?: Number;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
}