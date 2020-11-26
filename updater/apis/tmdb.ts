import { TmdbResponse, TmdbShow } from './../types/TmdbShow';
import axiosInstance from "../../lib/axios";
import { ApiResponse } from "../types/ApiResponse";
import { format } from 'date-fns';
import * as constants from "../constants";

const rootUrl = "https://api.themoviedb.org/3";

/**
 * 
 * @param {Date} start (The beginning datetime of your range)
 * @param {Date} end (The end datetime of your range)
 */
export async function getScheduleRange(start: Date, end: Date): Promise<ApiResponse> {
    const formattedStart = format(start, "yyyy-MM-dd");
    const formattedEnd = format(end, "yyyy-MM-dd");
    const path = `/discover/tv?api_key=${process.env.TMDB_KEY}&air_date.gte=${formattedStart}&air_date.lte=${formattedEnd}&timezone=${encodeURIComponent(constants.timezone)}`;
    try {
        const { data } = await getAllPages(path);
        console.log(data)
        return { data };
    } catch (error) {
        return { error };
    }
};

async function getAllPages(path: string): Promise<ApiResponse> {
    const fetchPage = async (page = 1, result: TmdbShow[] = []): Promise<TmdbShow[]> => {
        try {
            const { data } = await axiosInstance.get<TmdbResponse>(`${rootUrl}${path}&page=${page}`);
            if (data.page < data.total_pages) {
                result = [result, data.results].flat();
                return fetchPage(page + 1, result);
            }
            return result;
        } catch (error) {
            // todo: log/retry?
            console.log(error)
            throw new Error(error);
        }
    };

    const data = await fetchPage();

    return { data };
}