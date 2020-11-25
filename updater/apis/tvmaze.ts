import { eachDayOfInterval, format } from 'date-fns';
import axiosInstance from "../../lib/axios";
import fs from 'fs';

// Types / Entities
import { TvMazeWebEpisode } from './../types/tvMazeWebEpisode';
import { TvMazeEpisode, } from '../types/tvMazeEpisode';
import { ApiResponse } from './../types/ApiResponse';
import { Externals } from './../types/tvMazeEpisode';

const rootPath = "https://api.tvmaze.com";

/**
 * 
 * @param {Date} start (The beginning datetime of your range)
 * @param {Date} end (The end datetime of your range)
 */
export async function getScheduleRange(start: Date, end: Date): Promise<ApiResponse> {
    const range = eachDayOfInterval({ start, end });
    let promises: Promise<ApiResponse>[] = [];
    range.forEach(date => {
        promises.push(getScheduleByDay(date), getWebScheduleByDay(date));
    });
    try {
        const schedule = await Promise.all(promises);
        const data = schedule.reduce<Externals[]>((fullSchedule, dailyEpisodes) => {
            const externalEpisodeKeys = (dailyEpisodes.data as Array<TvMazeEpisode | TvMazeWebEpisode>)
                .map(episode => normalizeEpisode(episode)) // web episode -> episode
                .filter(isInvalidShow) // remove malformed episodes
                .map(episode => tvmazeEpisodeToExternalKeys(episode)); // episode -> Externals
            return fullSchedule.concat(...externalEpisodeKeys);
        }, []);
        return { data };
    } catch (error) {
        return { error };
    }
}

/**
 * 
 * @param day 
 * @param countryCode 
 * 
 * getScheduleByDay is a complete list of episodes that air in a given country on a given date.
 * Episodes are returned in the order in which they are aired, and full information about the episode and the corresponding show is included.
 *
 */
async function getScheduleByDay(day: Date, countryCode = "US"): Promise<ApiResponse> {
    const formattedDate = format(day, "yyyy-MM-dd");
    try {
        const request = await axiosInstance.get<TvMazeEpisode>(`${rootPath}/schedule?country=${countryCode}&date=${formattedDate}`);
        return { data: request.data };
    } catch (error) {
        return { error };
    };
}

export async function getShowByName(showName: string): Promise<ApiResponse> {
    try {
        const request = await axiosInstance.get(`${rootPath}/singlesearch/shows?q=${showName}`);
        return { data: request.data };
    } catch (error) {
        return { error };
    };
}

async function getWebScheduleByDay(day: Date, countryCode?: string | null): Promise<ApiResponse> {
    const formattedDate = format(day, "yyyy-MM-dd");
    try {
        const request = await axiosInstance.get(`${rootPath}/schedule/web?date=${formattedDate}${countryCode ? countryCode : ""}`);
        return { data: request.data };
    } catch (error) {
        return { error };
    };
}

function tvmazeEpisodeToExternalKeys(tvMazeShow: TvMazeEpisode): Externals {
    try {
        if (tvMazeShow.show.externals) {
            return {
                tvrage: tvMazeShow.show.externals.tvrage,
                thetvdb: tvMazeShow.show.externals.thetvdb,
                imdb: tvMazeShow.show.externals.imdb
            };
        }
    } catch {
        fs.appendFile('malformedEpisodes.json', JSON.stringify(tvMazeShow), () => { });
    }
}

/**
 * 
 * @param episode
 * 
 * Replaces the "_embedded" key in a web episode, and moves the "show" key up one level.
 * In short, converts type TvMazeWebEpisode to TvMazeEpisode
 */
function normalizeEpisode(episode: TvMazeEpisode | TvMazeWebEpisode): TvMazeEpisode {
    const webEpisode = episode as TvMazeWebEpisode;
    if (webEpisode.hasOwnProperty("_embedded")) {
        const showProperty = JSON.parse(JSON.stringify(webEpisode._embedded.show));
        delete webEpisode._embedded;
        showProperty.show = showProperty;
    }
    return webEpisode as TvMazeEpisode;
}

function isInvalidShow(episode: TvMazeEpisode) {
    return episode.hasOwnProperty("show");
}