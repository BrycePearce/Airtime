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
    image: null;
    summary: string;
    show: Show;
    _links: TvMazeLinks;
}

interface TvMazeLinks {
    self: Self;
}

interface Self {
    href: string;
}

interface Show {
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
    webChannel: Network;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: ShowLinks;
}

interface ShowLinks {
    self: Self;
    previousepisode: Self;
    nextepisode: Self;
}

interface Externals {
    tvrage: null;
    thetvdb: number;
    imdb: string;
}

interface Image {
    medium: string;
    original: string;
}

interface Network {
    id: number;
    name: string;
    country: Country;
}

interface Country {
    name: string;
    code: string;
    timezone: string;
}

interface Rating {
    average: number;
}

interface Schedule {
    time: string;
    days: string[];
}