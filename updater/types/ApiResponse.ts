import { TmdbSeason } from './TmdbSeason';
import { TmdbShow } from './TmdbShow';
import { AxiosError } from 'axios';

export interface ApiResponse {
    data?: TmdbShow | TmdbShow[] | TmdbSeason,
    error?: AxiosError
}