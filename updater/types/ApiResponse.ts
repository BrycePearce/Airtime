import { TvMazeWebEpisode } from './tvMazeWebEpisode';
import { TvMazeEpisode } from './tvMazeEpisode';
import { Show } from '../../db/entity';
import { AxiosError } from 'axios';

export interface ApiResponse {
    data?: TvMazeEpisode[] | TvMazeWebEpisode[] | TvMazeEpisode | Show[],
    error?: AxiosError
}