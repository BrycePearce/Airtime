export interface TvMazeEpisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: Date;
    airtime: string;
    airstamp: Date;
    runtime: number;
    image: string;
    summary: string;
    show: Show;
    _links: TvMazeLinks;
}

export interface TvMazeLinks {
    self: Self;
}

export interface Self {
    href: string;
}

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network;
    webChannel: WebChannel;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: ShowLinks;
}

interface WebChannel {
    id: number;
    name: string;
    country: Country;
}

export interface ShowLinks {
    self: Self;
    previousepisode: Self;
    nextepisode: Self;
}

export interface Externals {
    tvrage: number;
    thetvdb: number;
    imdb: string;
}

export interface Image {
    medium: string;
    original: string;
}

export interface Network {
    id: number;
    name: string;
    country: Country;
}

export interface Country {
    name: string;
    code: string;
    timezone: string;
}

export interface Rating {
    average: number;
}

export interface Schedule {
    time: string;
    days: string[];
}