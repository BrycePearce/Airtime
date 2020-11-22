import { eachDayOfInterval, format } from 'date-fns';
import axiosInstance from "../../lib/axios";

// Types / Entities
import { Show, Genre, Language, Network } from '../../db/entity';
import { ApiResponse } from './../types/ApiResponse';
import { TvMazeEpisode } from '../types/tvMaze';

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
    const promises = range.flatMap((date) => [getScheduleByDay(date), getWebScheduleByDay(date)]);
    try {
        const schedule = await Promise.all(promises);
        const data = schedule.reduce<Show[]>((fullSchedule, dailySchedule) => {
            const { data } = dailySchedule;
            const dailyShowEntities = data.map(episode => tvmazeEpisodeToShowEntity(episode));
            return [...fullSchedule, dailyShowEntities];
        }, []);
        return { data: data as Show[] };
    } catch (error) {
        return { error };
    }
}

/**
 * 
 * @param day 
 * @param countryCode 
 * 
 * getScheduleByDay is a complete list of episodes that air in a given country on a given date. Including web episodes.
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
    const show = new Show();
    if (tvMazeShow.show?.externals) {
        show.externalIds = {
            tvrage: tvMazeShow.show.externals?.tvrage,
            thetvdb: tvMazeShow.show.externals?.thetvdb.toString(),
            imdb: tvMazeShow.show.externals?.imdb
        };
    }
    let genres: Genre[] = [];
    tvMazeShow.show.genres.forEach(genre => {
        console.log(2);
        const showGenre = new Genre();
        showGenre.name = genre;
        genres.push(showGenre);
    });
    show.genres = genres;

    let language = new Language();
    language.name = tvMazeShow.show.language;
    show.language = [language];
    show.name = tvMazeShow.name;

    const network = new Network();
    network.name = tvMazeShow.show.network.name;
    network.country = tvMazeShow.show.network.country.name;
    network.countryCode = tvMazeShow.show.network.country.code;
    network.timezone = tvMazeShow.show.network.country.timezone;

    show.networks = [network];
    show.officialSite = tvMazeShow.show.officialSite;
    show.premiered = tvMazeShow.show?.premiered;
    show.ratingAverage = tvMazeShow.show?.rating.average.toString();
    show.runtime = tvMazeShow.runtime.toString();
    show.scheduleDate = tvMazeShow.show?.schedule.days[0]; // todo: update to be an array (dates)
    show.scheduleTime = tvMazeShow.show?.schedule.time;
    show.status = tvMazeShow.show?.status;
    show.summary = tvMazeShow.show?.summary;
    show.weight = tvMazeShow.show?.weight;
    return show;
}















/*
  "Hazel's Mishap",
  "Axel's Lucky Day",
  'Episode 43',
  'From Norman, OK',
  'Baby Mouth',
  'Gobble Head',
  'Home Sweet Home: Perfect as Pie',
  '2020-11-21',
  'Turkey Day To-Do List',
  'TBA',
  'Trash Dash',
  'Dishes that Keep Giving',
  'Save the Took Took',
  'Fossil Frenzy',
  'Of Mice and Munks',
  'Simon Saves the World',
  'Ole Miss at Texas A&M',
  'Motor City Favorites',
  'Suhs',
  'Nov 21 Sat',
  'The Thousand Pranks War: Part I',
  'Episode 9',
  'Abbott & Costello Meet Frankenstein',
  'Yard Sale',
  'Stairway to Hell',
  "Titanic's Lost Evidence",
  'The Miz',
  'Biological Mama Drama',
  'The Hissing Lynx',
  'Rolling Hills Asylum',
  'Polar Bear Opposites',
  'UFC 255: Figueiredo vs. Perez',
  'November 21, 2020',
  'Navigating a New Normal',
  'The Case Against Nicole Addimando',
  'The Mavericks: En Espanol',
  'Jared Logan & Clayton English'




*/