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
        const data = await getAllPages(path);
        return { data };
    } catch (error) {
        return { error };
    }
};

async function getAllPages(path: string): Promise<TmdbShow[]> {
    async function* getPage() {
        let url = `${rootUrl}${path}&page=1`;
        while (url) {
            const { data } = await axiosInstance.get<TmdbResponse>(url);
            // if we have more pages to traverse, update the page number and keep going
            url = data.page < data.total_pages ? `${rootUrl}${path}&page=${data.page + 1}` : null;
            yield data.results;
        }
    };

    const iterator = getPage();

    let data: TmdbShow[] = [];
    for await (const show of iterator) {
        data = [...data, ...show];
    }

    return data;
};