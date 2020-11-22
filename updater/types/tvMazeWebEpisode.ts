import { Show, TvMazeEpisode } from './tvMazeEpisode';

export interface TvMazeWebEpisode extends TvMazeEpisode { // show property does not exist on TvMazeWebEpisode. Extending this property for mapping purposes
    _embedded: Embedded;
}

export interface Embedded {
    show: Show;
}

