import { Show, ShowLinks } from './tvMazeEpisode';
export interface TvMazeWebEpisode {
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
    _links: ShowLinks;
    show?: Show // this property exists for mapping purposes, and does not exist on tv maze response
    _embedded: Embedded;
}

export interface Embedded {
    show: Show;
}

