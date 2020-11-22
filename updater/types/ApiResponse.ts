import { AxiosError } from 'axios';
import { Show } from '../../db/entity';
import { TvMazeEpisode } from './tvMaze';

export interface ApiResponse {
    data?: TvMazeEpisode[] | TvMazeEpisode | Show[],
    error?: AxiosError
}