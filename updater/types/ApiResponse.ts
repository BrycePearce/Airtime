import { AxiosError } from 'axios';
import { TmdbShow } from './TmdbShow';

export interface ApiResponse {
    data?: TmdbShow[],
    error?: AxiosError
}