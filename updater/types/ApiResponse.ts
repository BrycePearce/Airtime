import { AxiosError } from 'axios';

import { TvMazeWebEpisode } from './tvMazeWebEpisode';
import { TvMazeEpisode, Externals } from './tvMazeEpisode';

export interface ApiResponse {
    data?: TvMazeWebEpisode[] | TvMazeEpisode | Externals[],
    error?: AxiosError
}