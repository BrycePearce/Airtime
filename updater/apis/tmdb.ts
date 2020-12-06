import axiosInstance from "../../lib/axios";
import { format } from 'date-fns';

// Models
import { Episode, Genre, Language, Network, Season, Show } from '../../db/entity';
import { TmdbResponse, TmdbShow } from './../types/TmdbShow';
import { ApiResponse } from "../types/ApiResponse";
import { TmdbSeason } from "./../types/TmdbSeason";

import * as constants from "../constants";

const rootUrl = "https://api.themoviedb.org/3";

/**
 * 
 * @param {Date} start (The beginning datetime of your range)
 * @param {Date} end (The end datetime of your range)
 */
export async function getScheduleRange(start: Date, end: Date): Promise<Show[]> {
    const formattedStart = format(start, "yyyy-MM-dd");
    const formattedEnd = format(end, "yyyy-MM-dd");
    const path = `/discover/tv?api_key=${process.env.TMDB_KEY}&air_date.gte=${formattedStart}&air_date.lte=${formattedEnd}&timezone=${encodeURIComponent(constants.timezone)}`;
    const data = await getAllPages(path);
    if (data) {
        return await mapTmdbShowsToShowEntities(data);
    }
};

/**
 *
 * @param {number} id
 * @param {string} [appendToResponse=""]
 * @return {*}  {Promise<ApiResponse>}
 */
async function getShowDetails(id: number, appendToResponse: string = ""): Promise<ApiResponse> {
    const additionalItems = appendToResponse.length === 0 ? appendToResponse : `&append_to_response=${appendToResponse}`
    try {
        const request = await axiosInstance.get(`${rootUrl}/tv/${id}?api_key=${process.env.TMDB_KEY}${additionalItems}`);
        return { data: request.data as TmdbShow };
    } catch (error) {
        return { error };
    };
};

/**
 *
 * @param {number} id
 * @param {number} season
 * @param {string} [appendToResponse=""]
 * @return {*}  {Promise<ApiResponse>}
 */
async function getSeasonDetails(id: number, season: number, appendToResponse: string = ""): Promise<ApiResponse> {
    const additionalItems = appendToResponse.length === 0 ? appendToResponse : `&append_to_response=${appendToResponse}`
    try {
        const request = await axiosInstance.get(`${rootUrl}/tv/${id}/season/${season}?api_key=${process.env.TMDB_KEY}${additionalItems}`);
        return { data: request.data as TmdbSeason };
    } catch (error) {
        return { error };
    };
};

async function getAllPages(path: string): Promise<TmdbShow[]> {
    async function* pageGenerator() {
        let url = `${rootUrl}${path}&page=1`;
        while (url) {
            const { data } = await axiosInstance.get<TmdbResponse>(url);
            // if we have more pages to traverse, update the page number and keep going
            url = data.page < data.total_pages ? `${rootUrl}${path}&page=${data.page + 1}` : null;
            yield data.results;
        }
    };

    const iterator = pageGenerator();

    let data: TmdbShow[] = [];
    for await (const show of iterator) {
        data = [...data, ...show];
    }

    return data;
};

async function mapTmdbShowsToShowEntities(shows: TmdbShow[]): Promise<Show[]> {
    let detailedShowList: Show[] = [];
    for (const show of shows) {
        try {
            const tmdbShow = ((await getShowDetails(show.id, "external_ids")).data as TmdbShow);
            if (isValidTmdbShow(tmdbShow)) {
                // pull all the season information for the upcoming episode
                const tmdbSeason = ((await getSeasonDetails(tmdbShow.id, tmdbShow.next_episode_to_air.season_number)).data as TmdbSeason);
                const showEntity = mapTmdbDetailsToShowEntity(tmdbShow, tmdbSeason);
                detailedShowList.push(showEntity);
            }
        } catch (err) { // todo: retry for failed detail fetch?
            console.log(err);
        }
    }
    return detailedShowList;
};

/**
 *
 * @param {TmdbShow} show
 * @return {*}  {Boolean}
 * 
 * Returns true if the show meets the criteria to be added to the DB
 */
function isValidTmdbShow(show: TmdbShow): Boolean {
    /*
     * todo:
     * note to self: most null (not including episode_to_air) is handled at .save() time, so null checking here should not be a criteria.
     * Will need to consider new upcoming popular shows that may have null fields. Maybe create a weight, or find anticipated release list.
     */
    return show.next_episode_to_air !== null && show.next_episode_to_air?.season_number !== null;
}

function mapTmdbDetailsToShowEntity(tmdbShow: TmdbShow, tmdbSeason: TmdbSeason): Show {
    const show = new Show();

    show.name = tmdbShow.name

    show.externalIds = {
        tmdb: tmdbShow.id,
        imdb: tmdbShow.external_ids.imdb_id,
        facebook: tmdbShow.external_ids.facebook_id,
        instagram: tmdbShow.external_ids.instagram_id,
        twitter: tmdbShow.external_ids.twitter_id,
        tvdb: tmdbShow.external_ids.tvdb_id
    }

    show.genres = tmdbShow.genres.map(genre => ({ name: genre.name } as Genre));

    const language = new Language();
    language.name = tmdbShow.original_language;
    show.languages = [language];

    show.networks = [];
    tmdbShow.networks.forEach((network) => {
        const showNetwork = new Network();
        showNetwork.countryCode = network.origin_country;
        showNetwork.logoPath = network.logo_path;
        showNetwork.name = network.name;
        show.networks.push(showNetwork);
    });

    show.officialSite = tmdbShow.homepage;
    show.numEpisodes = tmdbShow.number_of_episodes;
    show.numSeasons = tmdbShow.number_of_seasons;
    show.posterPath = tmdbShow.poster_path;
    show.lastAired = tmdbShow.last_air_date;
    show.backdropPath = tmdbShow.backdrop_path;
    show.firstAired = tmdbShow.first_air_date;
    show.airing = tmdbShow.in_production; // todo: need to see what this in_production flag means, maybe should just check next episode here
    show.popularity = tmdbShow.popularity;
    show.status = tmdbShow.status;
    show.overview = tmdbShow.overview;

    // just mapping the currently active season for now
    show.seasons = [];
    show.seasons.push(mapTmdbSeasonToSeason(tmdbSeason));

    return show;
};

function mapTmdbSeasonToSeason(tmdbSeason: TmdbSeason): Season {
    const season = new Season();
    season.name = tmdbSeason.name;
    season.overview = tmdbSeason.overview;
    season.posterPath = tmdbSeason.poster_path;
    season.seasonNumber = tmdbSeason.season_number;

    let episodes: Episode[] = [];
    tmdbSeason.episodes.forEach((season) => {
        const episode = new Episode();
        episode.airDate = season.air_date;
        episode.episodeNumber = season.episode_number;
        episode.name = season.name;
        episode.overview = season.overview;
        episode.seasonNumber = season.season_number;
        episodes.push(episode);
    });

    season.episodes = episodes;
    return season;
}