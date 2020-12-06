export interface TmdbSeason {
    _id: string;
    air_date: Date;
    episodes: Episode[];
    name: string;
    overview: string;
    id: number;
    poster_path: string | null;
    season_number: number;
}

interface Episode {
    air_date: Date;
    episode_number: number;
    crew: Crew[];
    guest_stars: Crew[];
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

interface Crew {
    job?: string;
    department?: Department;
    credit_id: string;
    adult: boolean | null;
    gender: number | null;
    id: number;
    known_for_department: Department;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    character?: string;
    order?: number;
}

enum Department {
    Acting = "Acting",
    Camera = "Camera",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Production = "Production",
    Writing = "Writing",
}
