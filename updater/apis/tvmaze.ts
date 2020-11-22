import { eachDayOfInterval, format } from 'date-fns';
import axiosInstance from "../../lib/axios";

// Types / Entities
import { Show, Genre, Language, Network } from '../../db/entity';
import { TvMazeWebEpisode } from './../types/tvMazeWebEpisode';
import { TvMazeEpisode, } from '../types/tvMazeEpisode';
import { ApiResponse } from './../types/ApiResponse';
import fs from 'fs';

const rootPath = "https://api.tvmaze.com";

export async function getFullSchedule(): Promise<ApiResponse> {
    try {
        const request = await axiosInstance.get(`${rootPath}/schedule/full`);
        return { data: request.data };
    } catch (error) {
        return { error };
    };
}

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
        const data = schedule.reduce<Show[]>((fullSchedule, dailyEpisodes) => {
            const showEntities = (dailyEpisodes.data as Array<TvMazeEpisode | TvMazeWebEpisode>)
                .map(episode => normalizeEpisode(episode)) // web episode -> episode
                .filter(isInvalidShow) // remove malformed episodes
                .map(episode => tvmazeEpisodeToShowEntity(episode)); // episode -> Show
            return fullSchedule.concat(...showEntities);
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

function tvmazeEpisodeToShowEntity(tvMazeShow: TvMazeEpisode): Show {
    try {
        let show: Show = new Show();
        show.name = tvMazeShow.show.name;
        show.externalIds = {
            tvrage: tvMazeShow.show.externals.tvrage ? tvMazeShow.show.externals.tvrage.toString() : null,
            thetvdb: tvMazeShow.show.externals.thetvdb ? tvMazeShow.show.externals.thetvdb.toString() : null,
            imdb: tvMazeShow.show.externals.imdb
        }
        if (tvMazeShow.show.genres) {
            show.genres = tvMazeShow.show.genres.map(genre => ({ name: genre } as Genre));
        }

        const language = new Language();
        language.name = tvMazeShow.show.language;
        show.language = [language];

        if (tvMazeShow.show.network) {
            let network = new Network();

            network.name = tvMazeShow.show.network.name;
            show.networks = [network];
        }

        show.officialSite = tvMazeShow.show.officialSite;
        show.premiered = tvMazeShow.show.premiered;
        if (tvMazeShow.show.rating) {
            show.ratingAverage = tvMazeShow.show.rating.average ? tvMazeShow.show.rating.average.toString() : null;
        }
        show.runtime = tvMazeShow.runtime.toString();
        show.scheduleDate = tvMazeShow.show.schedule.days[0]; // todo: update to be an array (dates)
        show.scheduleTime = tvMazeShow.show.schedule.time;
        show.status = tvMazeShow.show.status;
        show.summary = tvMazeShow.show.summary;
        show.weight = tvMazeShow.show.weight;
        return show;
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